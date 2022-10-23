import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";

import logo from "../assets/img/logo.svg";

function Header({
  onMobileOpen,
  isOpenSidebar,
  onPopUpOpen,
  navigationLinks,
  locationPath,
}) {
  const [headerClassName, setHeaderClassName] = React.useState("");
  const { totalCount } = useSelector(({ cart }) => cart);

  const handleScroll = (headerClassName) => {
    if (headerClassName !== "scrolling" && window.pageYOffset >= 10) {
      setHeaderClassName("scrolling");
    } else if (headerClassName === "scrolling" && window.pageYOffset < 10) {
      setHeaderClassName("");
    }
  };

  React.useEffect(() => {
    window.onscroll = () => handleScroll(headerClassName);
  }, [headerClassName]);

  return (
    <header className={`masthead ${headerClassName}`}>
      <div className="container centered spaced full-height">
        <Link to="/" className="logo">
          <img src={logo} alt="womazing-logo" />
        </Link>
        <ul className="navigation">
          {navigationLinks.map((item, id) => {
            return (
              <li
                className={locationPath === item.link ? "active" : ""}
                key={`${item.name}_${id}`}
              >
                <Link to={item.link} title={item.name}>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="contacts" onClick={() => onPopUpOpen()}>
          <div className="image">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25235 2.81643C0.750523 4.31823 0.750523 6.7618 2.25232 8.2636L3.05001 7.46592C1.9881 6.40402 1.98807 4.67613 3.05004 3.61417C4.11197 2.55224 5.83985 2.55224 6.90179 3.61414L7.69947 2.81646C6.1977 1.31463 3.75412 1.31466 2.25235 2.81643Z"
                fill="#6E9C9F"
              />
              <path
                d="M3.84133 4.39119C3.20916 5.02336 3.20913 6.05201 3.8413 6.68421L4.63901 5.88652C4.54584 5.79335 4.49453 5.66947 4.49453 5.53771C4.49453 5.40598 4.54587 5.2821 4.63904 5.18893C4.73221 5.09576 4.8561 5.04444 4.98782 5.04444C5.11958 5.04444 5.24349 5.09576 5.33664 5.18893L6.13432 4.39122C5.50215 3.75902 4.4735 3.75902 3.84133 4.39119Z"
                fill="#6E9C9F"
              />
              <path
                d="M13.7482 2.43513L11.855 0.548473L7.92331 4.47366L9.44752 6.04781C9.19208 6.50125 8.63784 7.36989 7.69327 8.31446C6.74859 9.25917 5.8736 9.8197 5.41581 10.0792L3.87255 8.55562L0.00219727 12.4029L1.88504 14.2983C2.60479 15.0181 3.69992 15.2046 4.61014 14.7625C5.99915 14.0879 8.0954 12.8431 10.1942 10.7443C12.2931 8.64552 13.5378 6.54923 14.2124 5.16022C14.3723 4.83109 14.4499 4.47787 14.4499 4.12691C14.4499 3.50719 14.2077 2.89464 13.7482 2.43513ZM13.1977 4.66732C12.5609 5.97846 11.3845 7.95865 9.39655 9.94658C7.40862 11.9345 5.42842 13.1109 4.11729 13.7477C3.63929 13.9799 3.06281 13.8806 2.68414 13.5019L1.59739 12.4079L3.87537 10.1436L5.19009 11.4415L5.54184 11.2849C5.59899 11.2595 6.95941 10.6438 8.4911 9.11214C10.0238 7.57947 10.6266 6.23054 10.6515 6.17386L10.804 5.82683L9.50671 4.48704L11.8558 2.14178L12.9511 3.23326C13.3306 3.61329 13.4298 4.18952 13.1977 4.66732Z"
                fill="#6E9C9F"
              />
            </svg>
          </div>
          +7 (495) 823-54-12
        </div>
        <Link to="/cart" className="cart">
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
                <text x="23.5" y="10" className="number" fill="white">
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
        </Link>
        <div className="button-menu" onClick={() => onMobileOpen()}>
          <svg
            className={classNames("ham hamRotate", {
              active: isOpenSidebar,
            })}
            viewBox="0 0 100 100"
            width="80"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
