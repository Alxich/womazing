import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Card from "./Card";
import { Button } from "../index";

function Collection({ title, button, amount, products, handleProduct }) {
  const itemsAmount = amount ? products.slice(0, amount + 1) : products;

  return (
    <div
      id="collection"
      className={classNames(
        {
          "title-contains": title,
        },
        {
          "button-contains": button,
        },
        {
          "has-amount": amount,
        }
      )}
    >
      {title && (
        <div className="title section-left">
          <h2>{title}</h2>
        </div>
      )}

      <div className="container to-left collection wrap three-line">
        {itemsAmount.map((item, id) => {
          return (
            <Card
              key={`${item}__${id}`}
              {...item}
              handleProduct={handleProduct}
            />
          );
        })}
      </div>

      {button && (
        <Link to="/shop">
          <Button className="button" outline centered>
            Open a shop
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Collection;
