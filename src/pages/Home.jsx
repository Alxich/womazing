import React from "react";
import { useDispatch } from "react-redux";

import {
  Advantages,
  Collection,
  PromotionSlider,
  SliderBanner,
} from "../components/index";
import { fetchProducts } from "../redux/actions/products";

function Home({ handleProduct }) {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(fetchProducts(null));
  }, []);

  return (
    <>
      <SliderBanner />
      <div className="container centered column">
        <Collection
          title="New collection"
          button={true}
          amount={3}
          handleProduct={handleProduct}
        />
        <Advantages />
        <PromotionSlider />
      </div>
    </>
  );
}

export default Home;
