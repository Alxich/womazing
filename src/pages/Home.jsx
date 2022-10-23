import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Advantages,
  Collection,
  PromotionSlider,
  SliderBanner,
} from "../components/index";

import { fetchProducts } from "../redux/actions/products";

function Home() {
  const items = useSelector(({ products }) => products.items);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts(null));
  }, []);

  return (
    <>
      <SliderBanner />
      <div className="container centered column">
        <Collection
          title="New collection"
          products={items}
          button={true}
          amount={3}
        />
        <Advantages />
        <PromotionSlider />
      </div>
    </>
  );
}

export default Home;
