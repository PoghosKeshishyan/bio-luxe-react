import { useState, useEffect, useRef, useCallback } from "react";
import { BACKEND_API_URL } from "../config";

export function Slider({ slider, sliderIcons }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slider.length);
    }, 4000);
  }, [slider.length]);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [startAutoSlide]);

  const manualChangeSlide = (newIndex) => {
    setCurrentIndex(newIndex);
    startAutoSlide(); 
  };

  if (slider.length === 0 || !sliderIcons) return <p>Loading...</p>;

  return (
    <div
      id="home"
      style={{ backgroundImage: `url(${BACKEND_API_URL + slider[currentIndex].background_image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="content show" key={currentIndex}>
            <h1>0{slider[currentIndex].title}</h1>
            <p className="descr">{slider[currentIndex].descr}</p>
            <a href="/" className="btn">
              {slider[currentIndex].btn_text}
            </a>
          </div>
          <div className="img_div">
            <img
              className="show"
              src={BACKEND_API_URL + slider[currentIndex].image}
              alt="slide"
              key={currentIndex + "-img"}
            />
          </div>
          <div className="controls">
            <div
              className="arrow_div"
              onClick={() =>
                manualChangeSlide((currentIndex - 1 + slider.length) % slider.length)
              }
            >
              <img src={BACKEND_API_URL + sliderIcons.left_arrow_icon} alt="left" />
            </div>
            <div className="number">{String(currentIndex + 1).padStart(2, "0")}</div>
            <div
              className="arrow_div"
              onClick={() => manualChangeSlide((currentIndex + 1) % slider.length)}
            >
              <img src={BACKEND_API_URL + sliderIcons.right_arrow_icon} alt="right" />
            </div>
          </div>
        </div>
      </div>
      <img src={BACKEND_API_URL + sliderIcons.cloud_icon} alt="Cloud 1" className="cloud cloud1" />
      <img src={BACKEND_API_URL + sliderIcons.cloud_icon} alt="Cloud 2" className="cloud cloud2" />
      <img src={BACKEND_API_URL + sliderIcons.cloud_icon} alt="Cloud 3" className="cloud cloud3" />
      <img src={BACKEND_API_URL + sliderIcons.cloud_icon} alt="Cloud 4" className="cloud cloud4" />
    </div>
  );
}
