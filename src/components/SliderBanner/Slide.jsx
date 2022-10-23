import React from "react";
import { Button } from "../index";

import mainBannerImage from "../../assets/img/main-banner-image.png";
import secTopBannerImage from "../../assets/img/sec-top-banner-image.png";
import secBottomBannerImage from "../../assets/img/sec-bottom-banner-image.png";

function Slide() {
  return (
    <div className="slide">
      <div className="lt-side">
        <div className="title">
          <h1>
            New order collection <br /> in this season
          </h1>
        </div>
        <div className="more-info">
          <div className="text-block big-text to-right">
            <p>
              Sophisticated combinations and velvet shades - this is what you
              were looking for this season. Time to explore.
            </p>
          </div>
          <Button className="button" scrollToBlock toId="collection" side>
            Open a shop
          </Button>
        </div>
      </div>
      <div className="rt-side">
        <div className="secondary-image top">
          <img src={secTopBannerImage} alt="sec-top-banner-image" />
        </div>
        <div className="main-image">
          <img src={mainBannerImage} alt="main-banner-image" />
        </div>
        <div className="secondary-image bottom">
          <img src={secBottomBannerImage} alt="sec-bottom-banner-image" />
        </div>
      </div>
    </div>
  );
}

export default Slide;
