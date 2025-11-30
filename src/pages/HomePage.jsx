import { Slider } from "../components/Slider"
import { Categories } from "../components/Categories";
import { AboutUs } from "../components/AboutUs";
import { Popular_items } from "../components/PopularItems";
import { NewArrivals } from "../components/NewArrivals";
import { ContactUs } from "../components/ContactUs";
import { useState, useEffect } from "react";
import { OurPartners } from "../components/ourpartners/OurPartners";
import axios from "../axios";

export function HomePage() {

    const [slider, setSlider] = useState([]);
    const [sliderIcons, setSliderIcons] = useState({});
    const [categories, setCategories] = useState([]);
    const [c_heading, set_c_Heading] = useState("");
    const [aboutData, setAboutData] = useState([]);
    const [popular_items, setPopular_items] = useState(null);
    const [popular_items_heading, set_popular_items_Heading] = useState("");
    const [newArrivalsHeading, setNewArrivalsHeading] = useState("");
    const [newArriavals, setNewArrivals] = useState([]);
    const [contact, setContact] = useState([]);
    const [homepagePartnersHeading, setHomepagePartnersHeading] = useState([]);
    const [homepagePartners, setHomepagePartners] = useState([]);
    const currentLanguage = localStorage.getItem('lang') || 'en';

    useEffect(() => {
        const loadingData = async () => {
            try {
                const resSlider = await axios.get('slider?lang=' + currentLanguage);
                setSlider(resSlider.data);
                const resSlidesIcons = await axios.get('slider_icons');
                setSliderIcons(resSlidesIcons.data[0]);
                const res_c_Heading = await axios.get("categories_heading");
                const c_headingData = res_c_Heading.data.find(item => item.lang === currentLanguage);
                set_c_Heading(c_headingData.title);
                const resCategories = await axios.get("categories?lang=" + currentLanguage);
                setCategories(resCategories.data);
                const res = await axios.get("homepage_about_us?lang=" + currentLanguage);
                setAboutData(res.data[0]);
                const res_popular_Heading = await axios.get("homepage_popular_items_heading?lang=" + currentLanguage);
                const popular_headingData = res_popular_Heading.data.find(item => item.lang === currentLanguage);
                set_popular_items_Heading(popular_headingData.title);
                const resPopular_items = await axios.get("popular/items");
                setPopular_items(resPopular_items.data);
                const resNewArrivals = await axios.get('items/new-arrivals');
                setNewArrivals(resNewArrivals.data);
                const resNewHeading = await axios.get("homepage_new_arrivals_heading?lang=" + currentLanguage);
                const headingData = resNewHeading.data.find(item => item.lang === currentLanguage);
                setNewArrivalsHeading(headingData.title);
                const resContact = await axios.get("homepage_contacts?lang=" + currentLanguage);
                setContact(resContact.data[0]);
                const resHomepagePartnersHeading = await axios.get('homepage_partners_heading?lang=' + currentLanguage);
                setHomepagePartnersHeading(resHomepagePartnersHeading.data[0]);
                const resHomepagePartners = await axios.get('homepage_partners');
                setHomepagePartners(resHomepagePartners.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        window.scrollTo(0, 0);
        loadingData();
    }, [currentLanguage]);
console.log(contact);

    return (
        <div className="HomePage">
            <Slider slider={slider} sliderIcons={sliderIcons} />
            <Categories categories={categories} c_heading={c_heading} />
            <AboutUs aboutData={aboutData} />
            <Popular_items popular_items={popular_items} setPopular_items={setPopular_items} popular_items_heading={popular_items_heading} />
            <NewArrivals currentLanguage={currentLanguage} newArriavals={newArriavals} popular_items={popular_items} setPopular_items={setPopular_items} newArrivalsHeading={newArrivalsHeading} />
            <OurPartners homepagePartnersHeading={homepagePartnersHeading} homepagePartners={homepagePartners} />
            <ContactUs contact={contact} />
        </div>
    )
}