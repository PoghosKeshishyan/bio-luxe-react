import { Link } from "react-router-dom";

export function AboutUs({ aboutData }) {
  return (

    <div className="about_us">

      <div className="container">
        <div className="row">

          <h2 className="heading">
            <span>{aboutData.heading}</span>
            <div className="line"></div>
          </h2>
          <div className="box_container">
            <div className="box_img">
              <img src={aboutData.image_1} alt="img" />
            </div>

            <div className="box_content">
              <div className="descr_div">           
                <p className="descr">{aboutData.descr}</p>
                <Link className="btn" to={aboutData.btn_url}>
                  {aboutData.btn_text}
                </Link></div>
              <img src={aboutData.image_2} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
