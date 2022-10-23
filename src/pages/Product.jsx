import React from "react";

import { TitleBread, Collection, ProductInfo } from "../components/index";
import { fetchProducts } from "../redux/actions/products";
import { useSelector, useDispatch } from "react-redux";

function Product({ currentProduct, handleProduct }) {
  const items = useSelector(({ products }) => products.items);

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(fetchProducts(currentProduct.category));
  }, [currentProduct.category]);

  return (
    <div id="product">
      <div className="container centered column">
        <TitleBread title={currentProduct.name} product />
        <ProductInfo currentProduct={currentProduct} />
        <Collection
          title="Related products"
          products={items}
          amount={3}
          handleProduct={handleProduct}
        />
      </div>
    </div>
  );
}

export default Product;
