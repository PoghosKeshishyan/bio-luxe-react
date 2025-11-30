import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./axios";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ContactsPage } from "./pages/ContactsPage";
import { ListCategory } from "./pages/ListCategory";
import { ItemPage } from "./pages/ItemPage";
import { BasketSideBar } from "./components/BasketSideBar";
import { HeartSidebar } from './components/HeartSidebar';
import { SearchSidebar } from "./components/SearchSideBar";
import { ShoppingPage } from "./pages/ShoppingPage";
import { PrivacyPolicy } from "./components/privacypolicy/PrivacyPolicy";
import { NotFound } from "./pages/NotFound";


export function App() {
  const currentLanguage = localStorage.getItem('lang') || 'en';
  const [logo, setLogo] = useState([]);
  const [navbar, setNavbar] = useState([]);
  const [header_icons, setHeader_icons] = useState([]);
  const [heart_items, setHeart_items] = useState([]);
  const [basket_items, setBasket_items] = useState([]);
  const [basket_heart_view_link, setBasket_heart_view_links] = useState([]);
  const [footerInfoData, setFooterInfo] = useState({});
  const [footerPolicyData, setFooterPolicy] = useState([]);
  const [footerSocialData, setFooterSocial] = useState([]);
  const [languages, SetLanguages] = useState([]);
  const [productChange, setProductChange] = useState([]);
  const [allAvailableSizes, setAllAvailableSizes] = useState(() => {
    const savedSizes = localStorage.getItem("availableSizes");
    return savedSizes ? JSON.parse(savedSizes) : [];
  });

  useEffect(() => {
    const loadingData = async () => {
      try {
        const resLogo = await axios.get("logo");
        setLogo(resLogo.data[0]);

        const resNavbar = await axios.get("navbar?lang=" + currentLanguage);
        setNavbar(resNavbar.data);

        const resHeart_items = await axios.get("saved_heart_items?lang=" + currentLanguage);
        setHeart_items(resHeart_items.data[0]);

        const resBasket_items = await axios.get("saved_basket_items?lang=" + currentLanguage);
        setBasket_items(resBasket_items.data[0]);

        const resBasket_heart_view_link = await axios.get("basket_heart_view_link?lang=" + currentLanguage);
        setBasket_heart_view_links(resBasket_heart_view_link.data[0]);

        const resHeader_icons = await axios.get("header_icons");
        setHeader_icons(resHeader_icons.data[0]);

        const resLanguages = await axios.get("languages");
        SetLanguages(resLanguages.data);

        const resfooterInfo = await axios.get("footer_info?lang=" + currentLanguage);
        setFooterInfo(resfooterInfo.data[0]);

        const resfooterPolicy = await axios.get("footer_privacy_policy?lang=" + currentLanguage);
        setFooterPolicy(resfooterPolicy.data);

        const resfooterSocial = await axios.get("footer_social_links?lang=" + currentLanguage);
        setFooterSocial(resfooterSocial.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadingData();
  }, [currentLanguage]);



  return (
    <div className="App">
      <Header
        logo={logo}
        navbar={navbar}
        header_icons={header_icons}
        languages={languages}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category_name" element={<ListCategory />} />
        <Route path="/item/:item_id" element={<ItemPage productChange={productChange} setProductChange={setProductChange} setAllAvailableSizes={setAllAvailableSizes} />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactsPage />} />
        <Route path="/shopping_bag" element={<ShoppingPage allAvailableSizes={allAvailableSizes} />} />
        <Route path="/pravicy_polisy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

      <SearchSidebar />
      <HeartSidebar heart_items={heart_items} basket_heart_view_link={basket_heart_view_link} />
      <BasketSideBar basket_items={basket_items} basket_heart_view_link={basket_heart_view_link} />

      <Footer
        footerInfoData={footerInfoData}
        footerPolicyData={footerPolicyData}
        footerSocialData={footerSocialData}
      />

    </div>
  );
}
