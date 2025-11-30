import { Link } from "react-router-dom";

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
                <a href={`https://www.google.com/maps?q=${footerInfoData.address}`} target="_blank" rel="noreferrer noopener">
                  <p>
                    <img src={footerInfoData.address_icon} alt="Address icon" />
                    <span>{footerInfoData.address}</span>
                  </p>
                </a>
              </div>

              <div className="info_box">
                <a href={`tel:${footerInfoData?.phone}`}>

                <p>
                  <img
                    src={footerInfoData?.phone_icon}
                    alt="Phone icon"
                    className="footer-icon" />
                  {footerInfoData?.phone}</p>
                    </a>
              </div>

              <div className="info_box">
                <a href={`mailto:${footerInfoData?.email}`}>
                  <p>
                    <img
                      src={footerInfoData?.email_icon}
                      alt="Email icon"
                      className="footer-icon" />
                    {footerInfoData?.email}</p>
                </a>
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
                  src={link.icon}
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
