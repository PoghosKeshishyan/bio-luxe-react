import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../config";


export function Footer({ footerInfoData, footerPolicyData, footerSocialData }) {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to={"/"}>
              <img
                src="/images/logo.svg"
                alt="Bio Luxe Kids Logo"
                className="footer-logo"
              />
            </Link>
          </div>

          <div className="footer_info">

            <div className="info_contact">
              
              <div className="info_box">
                <p>
                  <img src={BACKEND_API_URL + footerInfoData.address_icon} alt="Address icon" />
                  <span>{footerInfoData.address}</span>
                </p>
              </div>

              <div className="info_box">
                <p>
                  <img
                    src={BACKEND_API_URL + footerInfoData?.phone_icon}
                    alt="Phone icon"
                    className="footer-icon" />
                  {footerInfoData?.phone}</p>
              </div>

              <div className="info_box">
                <p>
                  <img
                    src={BACKEND_API_URL + footerInfoData?.email_icon}
                    alt="Email icon"
                    className="footer-icon" />
                  {footerInfoData?.email}</p>
              </div>
            </div>

            <div className="policy">
              {footerPolicyData?.map((policy) => (
                <a key={policy.id} href={policy.url}>
                  {policy.title}
                </a>
              ))}
            </div>
          </div>


          <div className="social_media">
            {footerSocialData?.map((link) => (
              <a key={link.id} href={link.url} className="footer-social-icon">
                <img
                  src={BACKEND_API_URL + link.icon}
                  alt="social icon"
                  className="social-icon"
                />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
