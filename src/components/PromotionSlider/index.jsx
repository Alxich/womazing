import React from "react";
import { Button } from "../index";
import Slider from "react-slick";

import promotionSlide from "../../assets/img/promotion-slide.png";
import { Link } from "react-router-dom";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function PromotionSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="navigation">
        <div className="dots slider-usual">{dots}</div>
      </div>
    ),
    customPaging: (i) => <span></span>,
    nextArrow: <NextArrow className="arrow right black" />,
    prevArrow: <PrevArrow className="arrow left black" />,
  };

  return (
    <div id="promotions">
      <div className="title section-left">
        <h2>Womazing dream team</h2>
      </div>
      <div className="container centered spaced">
        <Slider className="slider" {...settings}>
          <div>
            <img src={promotionSlide} alt="promotion-image" />
          </div>
          <div>
            <img src={promotionSlide} alt="promotion-image" />
          </div>
          <div>
            <img src={promotionSlide} alt="promotion-image" />
          </div>
        </Slider>
        <div className="content">
          <div className="title">
            <h3>For each</h3>
          </div>
          <div className="text-block">
            <p>
              Every girl is unique. However, we are similar in a million little
              ways.
            </p>
            <p>
              Womazing looks for these little things and creates beautiful
              things that favorably emphasize the dignity of each girl.
            </p>
          </div>
          <Link to="/about">
            <Button className="button" link>
              <p>More about the brand</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PromotionSlider;
