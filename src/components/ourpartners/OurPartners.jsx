import { BACKEND_API_URL } from "../../config";



export function OurPartners({ homepagePartnersHeading, homepagePartners }) {
    
    return (

        <div className="OurPartners_container container">

            <div className="row">
                <div className="heading">
                    <h2>{homepagePartnersHeading?.heading}</h2>
                    <div className="line"></div>
                </div>
                {/* <div className="logo_section">
                    {homepagePartners.map(item => (
                        <div key={item?.id} className="logo_div">
                            <div className="image_div">
                                <img src={BACKEND_API_URL + item.image} alt="logo" />
                            </div>
                        </div>
                    ))}
                </div> */}
                
                    <div className="logo_section">
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                        <div className="logo_div">
                            <div className="image_div">
                                <img src="/images/our_partners.jpg" alt="logo" />
                            </div>
                        </div>
                    </div>
            </div>

        </div>

    );

}


