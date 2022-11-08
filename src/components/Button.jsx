import React from "react";
import classNames from "classnames";
import { scrollTo } from "./scrollTo";

const Button = ({
  onClick,
  className,
  link,
  side,
  usual,
  cta,
  centered,
  fullWidth,
  outline,
  cart,
  checkout,
  send,
  toTop,
  children,
  scrollToBlock,
  toId,
  toRef,
  duration,
}) => {
  const handleClick = () => scrollTo({ id: toId, ref: toRef, duration });

  return (
    <button
      onClick={!scrollToBlock ? onClick : () => handleClick()}
      className={classNames(
        "button",
        className,
        {
          link: link,
        },
        {
          "button-side-effect": side,
        },
        {
          "button-usual": usual,
        },
        {
          "button-cta": cta,
        },
        {
          centered: centered,
        },
        {
          "full-width": fullWidth,
        },
        {
          "button-outline": outline,
        },
        {
          "update-cart": cart,
        },
        {
          "button-checkout": checkout,
        },
        {
          "button-send": send,
        },
        {
          "back-to-top": toTop,
        }
      )}
    >
      {side ? (
        <>
          <div className="side-outcolor">
            <svg
              width="16"
              height="29"
              viewBox="0 0 16 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0V28M8 28L1 20.8108M8 28L15 20.8108"
                stroke="#6E9C9F"
              />
            </svg>
          </div>
          <div className="side">{children}</div>
        </>
      ) : toTop ? (
        <span className="content">
          <p aria-label="Back to top">{children}</p>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
