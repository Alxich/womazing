import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../index";

function Total({ totalPrice, cupponCode }) {
  return (
    <div className="cart-total">
      <div className="subtotal text-block">
        <p>Subtotal: ${totalPrice}</p>
      </div>
      <div className="final-action">
        <div className="total title">
          <h3>
            <span>Total:</span>
            <span>
              ${cupponCode === "Alxich" ? totalPrice % 2 : totalPrice}
            </span>
          </h3>
        </div>
        <Link to="/cart/checkout">
          <Button className="button" usual cta>
            Place an order
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Total;
