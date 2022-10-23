import React from "react";
import { Button } from "../index";

function OrderInfo({
  totalPrice,
  items,
  cupponCode,
  setCheckboxCheck,
  checkboxCheck,
  handleSubmit,
}) {
  const addedItems = Object.keys(items).map((key) => {
    return items[key].items[0];
  });

  return (
    <div className="order-info">
      <div className="order-check">
        <div className="title">
          <h3>Your order</h3>
        </div>
        <div className="table">
          <div className="title">
            <h4>
              <span>Goods</span>
              <span>In total</span>
            </h4>
          </div>
          {addedItems.map((item, id) => {
            return (
              <div className="item" key={`${item}__${id}`}>
                <div className="title">
                  <p>{item.name}</p>
                </div>
                <div className="text-block">
                  <p>${item.price}</p>
                </div>
              </div>
            );
          })}
          <div className="subtotal title">
            <p>
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </p>
          </div>
          <div className="total title">
            <h4>
              <span>
                Total {cupponCode === "Alxich" ? "(with coupone)" : ""}
              </span>
              <span>
                ${cupponCode === "Alxich" ? totalPrice % 2 : totalPrice}
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className="payment-methods">
        <div className="title">
          <h3>Payment methods</h3>
        </div>
        <label>
          <input
            type="checkbox"
            onClick={() =>
              !checkboxCheck ? setCheckboxCheck(true) : setCheckboxCheck(false)
            }
          />
          Payment in cash
        </label>
        <Button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          usual
          checkout
        >
          Place an order
        </Button>
      </div>
    </div>
  );
}

export default OrderInfo;
