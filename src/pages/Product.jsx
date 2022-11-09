import React from "react";

import { TitleBread, Collection, ProductInfo } from "../components/index";
import { fetchProducts } from "../redux/actions/products";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function Product({ currentProduct, handleProduct }) {
  const items = useSelector(({ products }) => products.items);
  const dispatch = useDispatch();

  const sessionstorage = sessionStorage.getItem("currentProduct");
  const currenLocalProduct =
    sessionstorage !== "undefined" || sessionstorage !== "null"
      ? JSON.parse(sessionstorage)
      : currentProduct;

  React.useEffect(() => {
    currenLocalProduct !== "undefined" &&
      currenLocalProduct !== null &&
      dispatch(fetchProducts(currenLocalProduct.category));
  }, []);

  return currenLocalProduct !== "undefined" && currenLocalProduct !== null ? (
    <div id="product">
      <div className="container centered column">
        <TitleBread title={currenLocalProduct.name} product />
        <ProductInfo currentProduct={currenLocalProduct} />
        <Collection
          title="Related products"
          products={items}
          amount={3}
          handleProduct={handleProduct}
        />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Product;
