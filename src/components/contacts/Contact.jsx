import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../config";

export function Contact({ contactTitle, contactInfo, contactForm }) {
  const pravicy_policy = contactForm?.priacy_policy_text?.split('/');

  return (
    <section className="contact-section">
      <div className="contact-box">
        <div className="image-box">
          <img src={BACKEND_API_URL + contactTitle.image_url} alt="kravat" />
          <h1>{contactTitle.title}</h1>
        </div>
      </div>
      <div className='main_shopping_link'>
        <span className='link_div'>
          <Link to="/" className='main'>{contactTitle?.main} </Link> /
          <Link className='shopping_bag'>{contactTitle?.title}</Link>
        </span>
      </div>

      <div className="contact-container">
        <div className="map-container">
          {contactInfo.map_image ? (
            <iframe className="map-image" src={contactInfo.map_image} title="Map" />
          ) : (
            <p>No map available.</p>
          )}
          <div className="contact-info">
            <div className="info_contact">
              <div className="info_box">
                <p>
                  <img src={ BACKEND_API_URL + contactInfo.address_icon} alt="Address icon" /><span>{contactInfo.address}</span>
                </p>
              </div>
              <div className="info_box">
                <p>
                  <img
                    src={BACKEND_API_URL + contactInfo?.phone_icon}
                    alt="Phone icon"
                    className="footer-icon"
                  />{contactInfo?.phone}</p>
              </div>
              <div className="info_box">
                <p>
                  <img
                    src={BACKEND_API_URL + contactInfo?.email_icon}
                    alt="Email icon"
                    className="footer-icon"
                  />{contactInfo?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-container">
          <h2>{contactForm.title}</h2>
          <form className="contact-form">
            <input type="text" placeholder={contactForm.input_placeholder_name} required />
            <input type="email" placeholder={contactForm.input_placeholder_email} required />
            <input type="tel" placeholder={contactForm.input_placeholder_phone} required />
            <button type="submit">{contactForm.btn_text}</button>
            <p className="privacy-text"> {pravicy_policy[0]}<a href={contactForm.pravicy_policy_url}> {pravicy_policy[1]}</a> {pravicy_policy[2]}</p>
          </form>
        </div>
      </div>

    </section>

  );
}

