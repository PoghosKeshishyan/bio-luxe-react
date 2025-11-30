import { useEffect, useState } from "react";
import axios from "../axios";
import { Contact } from "../components/contacts/Contact";

export function ContactsPage() {
  const currentLanguage = localStorage.getItem('lang') || 'en';
  const [infoAboutDelivery, setInfoAboutDelivery] = useState([]);
  const [contactTitle, setContactTitle] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [contactForm, setContactForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadingData = async () => {
      try {

        const resInfoAboutDelivery = await axios.get('infoAbout_delivery?lang=' + currentLanguage);
        setInfoAboutDelivery(resInfoAboutDelivery.data);

        const resContactTitle = await axios.get('contact_title?lang=' + currentLanguage)
        setContactTitle(resContactTitle.data[0])

        const resContactInfo = await axios.get('contact_info?lang=' + currentLanguage)
        setContactInfo(resContactInfo.data[0])

        const resContactForm = await axios.get('contact_form?lang=' + currentLanguage)
        setContactForm(resContactForm.data[0])

        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    loadingData();
  }, [currentLanguage]);



  return (
    <div className="ContactPage">
      {loading && <Contact contactTitle={contactTitle} contactInfo={contactInfo} contactForm={contactForm} infoAboutDelivery={infoAboutDelivery} />}
    </div>
  );
}
