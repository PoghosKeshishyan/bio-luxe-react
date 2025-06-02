import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../config";


export function AboutAs({ aboutUs, aboutTexts }) {

    return (
        <div className="about_as">
            <div className="about-box">
                <div className="image-box">
                    <img src={BACKEND_API_URL + aboutUs.image} alt="kravat" />
                    <h2>{aboutUs.heading}</h2>
                </div>
            </div>
            <div className="container">
                <div className='main_shopping_link'>
                    <span className='link_div'>
                        <Link to="/" className='main'>{aboutUs?.main} </Link> /
                        <Link className='shopping_bag'>{aboutUs?.heading}</Link>
                    </span>

                </div>
                {
                    aboutTexts.map(elem => (
                        <div key={elem.id} className="info_section">
                            <div className="heading">
                                <h3>{elem.heading}</h3>
                                <div className="line"></div>
                            </div>
                            <div className="info">
                                <div className="text">
                                    <p>{elem.content1}</p>
                                    <p>{elem.content2}</p>
                                </div>
                                <div className="image_div">
                                    <img src={ BACKEND_API_URL + elem.image} alt="section1" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

}