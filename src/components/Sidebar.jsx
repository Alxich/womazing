import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import instagram from "../assets/img/instagram.svg";
import facebook from "../assets/img/facebook.svg";
import twitter from "../assets/img/twitter.svg";
import { useSelector } from "react-redux";

function Sidebar({
  onMobileClose,
  isOpenSidebar,
  navigationLinks,
  locationPath,
  currentShopCat,
  handleShopCat,
}) {
  const { totalPrice, totalCount } = useSelector(({ cart }) => cart);

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
    <div
      className={classNames("sidebar", {
        active: isOpenSidebar,
      })}
    >
      <div className="close" onClick={() => onMobileClose()}>
        <span></span>
        <span></span>
      </div>
      <div className="current-information">
        <div className="total title">
          <h4>
            Total: <span>${totalPrice}</span>
          </h4>
        </div>
        <Link to="/cart" className="cart">
          <div className="cart">
            <svg
              width="34"
              height="35"
              viewBox="0 0 34 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_0_1)">
                <path
                  d="M23.8454 19.2243C23.7281 19.1091 23.5642 19.0544 23.4012 19.0762H17.0343V16.263C17.0343 13.4826 14.7804 11.2287 12.0001 11.2287C9.21971 11.2287 6.96582 13.4826 6.96582 16.263V19.0762H0.598861C0.421164 19.0762 0.243523 19.0762 0.154646 19.2243C0.0352739 19.339 -0.0201042 19.5051 0.00659291 19.6685L2.22761 31.81C2.53789 33.5037 4.00034 34.7431 5.72199 34.7713H18.278C20.0046 34.7289 21.464 33.4797 21.7724 31.7804L23.9934 19.6685C24.0201 19.5051 23.9648 19.339 23.8454 19.2243ZM8.1503 16.263C8.1503 14.1368 9.87388 12.4132 12 12.4132C14.1261 12.4132 15.8497 14.1368 15.8497 16.263V19.0762H8.1503V16.263ZM20.5879 31.6323C20.3884 32.7547 19.4179 33.5759 18.278 33.5868H5.72199C4.58212 33.5759 3.61161 32.7547 3.41215 31.6323L1.30959 20.2608H22.6904L20.5879 31.6323Z"
                  fill="black"
                />
                <path
                  d="M16.442 26.0354C16.7691 26.0354 17.0343 25.7702 17.0343 25.4431V23.6663C17.0343 23.3392 16.7691 23.074 16.442 23.074C16.1149 23.074 15.8497 23.3392 15.8497 23.6663V25.4431C15.8497 25.7702 16.1149 26.0354 16.442 26.0354Z"
                  fill="black"
                />
                <path
                  d="M7.55809 26.0354C7.8852 26.0354 8.15036 25.7702 8.15036 25.4431V23.6663C8.15036 23.3392 7.8852 23.074 7.55809 23.074C7.23098 23.074 6.96582 23.3392 6.96582 23.6663V25.4431C6.96582 25.7702 7.23098 26.0354 7.55809 26.0354Z"
                  fill="black"
                />
              </g>
              {totalCount && (
                <>
                  <rect x="19" width="15" height="15" rx="7.5" fill="#998E78" />
                  <text x="23.5" y="10" className="number" fill="#000">
                    {totalCount > 9 ? "9" : totalCount}
                  </text>
                </>
              )}
              <defs>
                <clipPath id="clip0_0_1">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 11)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </Link>
      </div>
      <div className="navigation-container">
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
      <div className="socials-container">
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
    </div>
  );
}

export default Sidebar;
