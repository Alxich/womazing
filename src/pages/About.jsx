import React from "react";
import { Link } from "react-router-dom";

import { AboutItem, TitleBread, Button } from "../components";

import aboutItemImageOne from "../assets/img/about-item-one.png";
import aboutItemImageSec from "../assets/img/about-item-sec.png";

function About() {
  return (
    <div id="about">
      <div className="container centered column">
        <TitleBread title="About" />
        <AboutItem
          image={aboutItemImageOne}
          title="Idea and woman"
          text={[
            <p key={`${aboutItemImageOne}_1`}>
              Womazing was founded in 2010 and has become one of the most
              successful companies in our country. Like many Italian companies,
              Womazing remains a family company, although none of the family
              members are fashion designers.
            </p>,
            <p key={`${aboutItemImageOne}_2`}>
              We operate according to a successful formula, using the services
              of well-known fashion designers to create our collections. This
              method was described by fashion critic Colin McDowell as a form of
              designer co-creation, characteristic of a number of Italian
              prêt-a-porter companies.
            </p>,
          ]}
          key={`${aboutItemImageOne}`}
        />
        <AboutItem
          image={aboutItemImageSec}
          title="The magic is in the details"
          text={[
            <p key={`${aboutItemImageSec}_1`}>
              The first Womazing store was opened in a small town in the north
              of the country in 2010. The first collection consisted of two
              coats and a suit, which were copies of Parisian models.
            </p>,
            <p key={`${aboutItemImageSec}_2`}>
              Despite the fact that the founder was a lawyer by education, her
              family has always been closely connected with sewing (the
              founder's great-grandmother sewed clothes for women, and her
              mother founded a professional tailoring and sewing school). The
              desire to produce clothes for the masses carried great prospects,
              especially at a time when haute couture still dominated, and the
              market for high-quality prêt-a-porter simply did not exist.
            </p>,
          ]}
          key={`${aboutItemImageSec}`}
        />
        <Link to="/shop">
          <Button className="button" usual cta>
            Go to the store
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default About;
