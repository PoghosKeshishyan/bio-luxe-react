import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "../axios";
import { Item } from "../components/singleItem/Item";

export function ItemPage({ productChange, setProductChange, setAllAvailableSizes }) {
  const [item, setItem] = useState({});
  const [allItems, setAllItems] = useState([]);
  const { item_id } = useParams();
  const currentLanguage = localStorage.getItem("lang") || "en";
  const [itemPageFields, setItemPageFields] = useState(null);
  const [popularPlider, setPopularPlider] = useState([]);
  const [linkProductHeading, setLinkProductHeading] = useState([]);
  const [itemLink, setItemLink] = useState([]);
  const [infoAboutDelivery, setInfoAboutDelivery] = useState([]);
  const [itemFaqHeading, setItemFaqHeading] = useState([]);
  const [itemFaq, setItemFaq] = useState([]);

  useEffect(() => {
    const loadingData = async () => {
      const resItem = await axios.get(`items/${item_id}`);
      const mainItem = resItem.data.item;
      const related = resItem.data.relatedItems || [];
      const merged = [mainItem, ...related.filter(p => p.id !== mainItem.id)];
      setItem(mainItem);
      setAllItems(merged);
      setPopularPlider(merged);
      // (merged–ը հիմա պահում է main item + related items)
      const resItemPageFields = await axios.get('item_page_fields?lang=' + currentLanguage);
      setItemPageFields(resItemPageFields.data[0]);

      const resLinkProductHeading = await axios.get('liked_product_heading?lang=' + currentLanguage);
      setLinkProductHeading(resLinkProductHeading.data[0]);

      const resItemLink = await axios.get('item_link?lang=' + currentLanguage);
      setItemLink(resItemLink.data[0]);

      const resInfoAboutDelivery = await axios.get('infoAbout_delivery?lang=' + currentLanguage);
      setInfoAboutDelivery(resInfoAboutDelivery.data[0]);

      const resItemFaqHeading = await axios.get('item_faq_heading?lang=' + currentLanguage);
      setItemFaqHeading(resItemFaqHeading.data[0]);
      const resItemFaq = await axios.get('item_faq?lang=' + currentLanguage);
      setItemFaq(resItemFaq.data);
    };

    window.scrollTo(0, 0);
    loadingData();
  }, [currentLanguage, item_id])

  return (
    <div className="ItemPage">
      <div className="container">
        <Item setAllAvailableSizes={setAllAvailableSizes} productChange={productChange} setProductChange={setProductChange} item={item} allItems={allItems} currentLanguage={currentLanguage} itemPageFields={itemPageFields} popularPlider={popularPlider} linkProductHeading={linkProductHeading} itemLink={itemLink} infoAboutDelivery={infoAboutDelivery} itemFaqHeading={itemFaqHeading} itemFaq={itemFaq} />
      </div>
    </div>
  )
}
