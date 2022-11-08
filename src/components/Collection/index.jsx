import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "./Card";
import { Button } from "../index";

function Collection({ title, button, amount, handleProduct }) {
  const [itemsAmount, setItemsAmout] = React.useState();

  const products = useSelector(({ products }) => products.items);

  React.useEffect(() => {
    setItemsAmout(amount ? products?.slice(0, amount + 1) : products);
  }, [products]);

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
        {itemsAmount?.map((item, id) => {
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
