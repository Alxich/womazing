import React from "react";
import Slider from "react-slick";

import Slide from "./Slide";

function SliderBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="navigation">
        <div className="dots slider-banner">{dots}</div>
      </div>
    ),
    customPaging: (i) => <span></span>,
  };

  return (
    <div id="slider-banner">
      <Slider className="slide-container" {...settings}>
        <Slide />
        <Slide />
        <Slide />
      </Slider>
    </div>
  );
}

export default SliderBanner;
