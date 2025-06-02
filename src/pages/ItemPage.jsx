import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "../axios";
import { Item } from "../components/singleItem/Item";

export function ItemPage() {
  const [item, setItem] = useState({});
  const { item_id } = useParams();
  const currentLanguage = localStorage.getItem("lang") || "en";

  const [itemPageFields, setItemPageFields] = useState(null);
  const [popularPlider, setPopularPlider] = useState([]);
  const [linkProductHeading, setLinkProductHeading] = useState([]);
  const [itemLink, setItemLink] = useState([]);
  const [infoAboutDelivery, setInfoAboutDelivery] = useState([]);



  useEffect(() => {
    const loadingData = async () => {
      const resItem = await axios.get(`items/${item_id}`);
      setItem(resItem.data);
      const resItemPageFields = await axios.get('item_page_fields?lang=' + currentLanguage);
      setItemPageFields(resItemPageFields.data[0]);

      const resPopularPlider = await axios.get('items');
      setPopularPlider(resPopularPlider.data);

      const resLinkProductHeading = await axios.get('liked_product_heading?lang=' + currentLanguage);
      setLinkProductHeading(resLinkProductHeading.data[0]);

      const resItemLink = await axios.get('item_link?lang=' + currentLanguage);
      setItemLink(resItemLink.data[0]);
      
      const resInfoAboutDelivery = await axios.get('infoAbout_delivery?lang=' + currentLanguage);
      setInfoAboutDelivery(resInfoAboutDelivery.data);

    };

    window.scrollTo(0, 0);
    loadingData();
  }, [currentLanguage, item_id])

  return (
    <div className="ItemPage">
      <div className="container">
        <Item item={item} itemPageFields={itemPageFields} popularPlider={popularPlider} linkProductHeading={linkProductHeading} itemLink={itemLink} infoAboutDelivery={infoAboutDelivery}  />
      </div>
    </div>
  )
}
