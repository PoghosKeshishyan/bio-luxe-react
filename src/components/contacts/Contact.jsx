import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../config";
import emailjs from "emailjs-com";
import { useRef } from "react";

export function Contact({ contactTitle, contactInfo, contactForm }) {
  const pravicy_policy = contactForm?.priacy_policy_text?.split('/');
  const formRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_4v2y1hj",          
      "template_caumusm",         
      formRef.current,
      "gO0LYLAsKjEHnAsQl"           
    ).then(
      (result) => {
        console.log("SUCCESS!", result.text);
        alert("Ձեր հաղորդագրությունը հաջողությամբ ուղարկվել է:");
      },
      (error) => {
        console.log("FAILED...", error.text);
        alert("Ձեր հաղորդագրությունը չհաջողվեց ուղարկել։");
      }
    );
    e.target.reset();
  };

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
                <a href={`https://www.google.com/maps?q=${contactInfo.address}`} target="_blank" rel="noreferrer noopener">
                  <p>
                    <img src={BACKEND_API_URL + contactInfo.address_icon} alt="Address icon" />
                    <span>{contactInfo.address}</span>
                  </p>
                </a>
              </div>
              <div className="info_box">
                <a href={`tel:${contactInfo?.phone}`}>
                  <p>
                    <img
                      src={BACKEND_API_URL + contactInfo?.phone_icon}
                      alt="Phone icon"
                      className="footer-icon"
                    />
                    {contactInfo?.phone}
                  </p>
                </a>
              </div>
              <div className="info_box">
                <a href={`mailto:${contactInfo?.email}`}>
                  <p>
                    <img
                      src={BACKEND_API_URL + contactInfo?.email_icon}
                      alt="Email icon"
                      className="footer-icon"
                    />
                    {contactInfo?.email}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="form-container">
          <h2>{contactForm.title}</h2>
          <form ref={formRef} onSubmit={onSubmit} className="contact-form">
            <input type="text" name="name" placeholder={contactForm.input_placeholder_name} required />
            <input type="email" name="mail" placeholder={contactForm.input_placeholder_email} required />
            <textarea name="message" placeholder={contactForm.input_placeholder_phone} required />
            <button type="submit">{contactForm.btn_text}</button>
            <p className="privacy-text">
              {pravicy_policy[0]}
              <Link to={contactForm.priacy_policy_url}>{pravicy_policy[1]}</Link>
              {pravicy_policy[2]}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
