import React from "react";
import { Link } from "react-router-dom";

import logoWhite from "../assets/img/logo-white.svg";
import instagram from "../assets/img/instagram.svg";
import facebook from "../assets/img/facebook.svg";
import twitter from "../assets/img/twitter.svg";
import visaPay from "../assets/img/visa-pay.png";

function Footer({
  navigationLinks,
  locationPath,
  handleShopCat,
  currentShopCat,
}) {
  const returnSubMenu = (element) => {
    return element.map((item, id) => {
      return (
        <li
          className={currentShopCat === item.name ? "active" : ""}
          key={`${item.name}_${id}`}
        >
          <Link
            to={item.link}
            state={{ category: item.name }}
            title={item.name}
            onClick={() => handleShopCat(item.name)}
          >
            <span>{item.name}</span>
          </Link>
        </li>
      );
    });
  };

  return (
    <footer className="colophon">
      <div className="container centered spaced">
        <div className="brands-container col">
          <Link to="/" className="logo">
            <img src={logoWhite} alt="brand-logo-white" />
          </Link>
          <ul className="privacy">
            <li>© All rights reserved</li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/privacy">Public offer</Link>
            </li>
          </ul>
        </div>
        <div className="navigation-container col">
          <ul>
            {navigationLinks.map((item, id) => {
              return (
                <li
                  className={locationPath === item.link ? "active" : ""}
                  key={`${item.name}_${id}`}
                >
                  <Link to={item.link} title={item.name}>
                    <span>{item.name}</span>
                  </Link>
                  {item.subMenu && (
                    <ul className="sub-menu">{returnSubMenu(item.subMenu)}</ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="contacts-container col">
          <ul className="contacts">
            <li>+7 (495) 823-54-12</li>
            <li>hello@womazing.com</li>
          </ul>
          <ul className="socials">
            <li>
              <img src={instagram} alt="instagram-icon-soc" />
            </li>
            <li>
              <img src={facebook} alt="facebook-icon-soc" />
            </li>
            <li>
              <img src={twitter} alt="twitter-icon-soc" />
            </li>
          </ul>
          <div className="visa">
            <img src={visaPay} alt="visa-pay-aproved" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
