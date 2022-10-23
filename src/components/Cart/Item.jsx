import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";

function Item({
  id,
  title,
  image,
  price,
  amount,
  total,
  onRemoveItem,
  onPlusCartItem,
  onMinusCartItem,
}) {
  const changeCounterValue = (value, id) => {
    switch (value) {
      case "INCRIMENT":
        onPlusCartItem(id);
        break;
      case "DECRIMENT":
        onMinusCartItem(id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="item container centered spaced full-width">
      <div className="remove" onClick={() => onRemoveItem(id)}>
        <span></span>
        <span></span>
      </div>
      <div className="thumbnail">
        <img src={image} alt="cart-item-image" />
      </div>
      <div className="title name">
        <p>{title}</p>
      </div>
      <div className="price text-block">
        <p>${price}</p>
      </div>
      <div className="quantity">
        <div className="counter">
          <div
            className="up changer"
            onClick={() => changeCounterValue("INCRIMENT", id)}
          >
            <FontAwesomeIcon icon={faChevronCircleUp} />
          </div>
          <input
            type="number"
            min="1"
            placeholder={amount}
            value={amount}
            readOnly
          />
          <div
            className="down changer"
            onClick={() => changeCounterValue("DECRIMENT", id)}
          >
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </div>
        </div>
      </div>
      <div className="total text-block">
        <p>${total}</p>
      </div>
    </div>
  );
}

export default Item;
