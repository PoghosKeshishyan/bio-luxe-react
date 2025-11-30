import { useEffect, useState } from "react";
import axios from "../axios";
import { AboutAs } from "../components/aboutAs/AboutAs";

export function AboutUsPage() {
    const currentLanguage = localStorage.getItem('lang') || 'en';
    const [aboutUs, setAboutUs] = useState([])
    const [aboutTexts, setAboutTexts] = useState([])

    useEffect(() => {
        const loadingData = async () => {
            try {
                const resAboutUs = await axios.get('about_us?lang=' + currentLanguage)
                setAboutUs(resAboutUs.data[0])
                const resAboutTexts = await axios.get('about_texts?lang=' + currentLanguage)
                setAboutTexts(resAboutTexts.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        loadingData();
    }, [currentLanguage]);

    return (
        <div className="AboutPage">
            <AboutAs aboutUs={aboutUs} aboutTexts={aboutTexts} />
        </div>
    )
}