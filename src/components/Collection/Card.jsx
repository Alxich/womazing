import React from "react";
import { Link } from "react-router-dom";
// import cardImage from "../../assets/img/card-image.png";

function Card({ name, price, imageUrl, id, handleProduct }) {
  return (
    <div className="card" onClick={() => handleProduct(id)}>
      <Link
        state={{ productId: id }}
        to={`/shop/product/${name.replace(/\s/g, "-").toLowerCase()}`}
        className="container centered column"
      >
        <div className="thumbnail">
          <img src={imageUrl} alt="card-image" />
          <div className="hover">
            <div className="arrow right white">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="title">
          <h4>{name}</h4>
        </div>
        <div className="price">
          {price.old ? (
            <>
              <p className="old">${price.old}</p>
              <p>${price.new}</p>
            </>
          ) : (
            <p>${price}</p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default Card;
