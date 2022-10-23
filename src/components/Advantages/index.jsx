import React from "react";
import Item from "./Item";

import qualityIcon from "../../assets/img/quality-ico.svg";
import speedIcon from "../../assets/img/speed-ico.svg";
import responsibilityIcon from "../../assets/img/responsibility.svg";

function Advantages() {
  return (
    <div id="advantages">
      <div className="title section-left">
        <h2>What is important to us</h2>
      </div>
      <div className="container to-left collection wrap three-line">
        <Item
          icon={qualityIcon}
          title="Quality"
          text="Our professionals work on the best equipment for sewing clothes of unprecedented quality"
        />
        <Item
          icon={speedIcon}
          title="Speed"
          text="Thanks to the well-established system at Womazing, we can sew up to 20 units of production in our own workshops"
        />
        <Item
          icon={responsibilityIcon}
          title="Responsibility"
          text="We care about people and the planet. Waste-free production and comfortable working conditions are all Womazing"
        />
      </div>
    </div>
  );
}

export default Advantages;
