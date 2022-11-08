import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { Button, ProductSelectors } from "../index";

function ProductInfo({ currentProduct }) {
  const dispatch = useDispatch();
  const [currentActiveColor, setCurrentActiveColor] = React.useState(false);
  const [currentActiveSize, setCurrentActiveSize] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(false);

  const handleAddToCart = () => {
    const price = currentProduct.price.old
      ? currentProduct.price.new
      : currentProduct.price;

    const obj = {
      id: currentProduct.id,
      name: currentProduct.name,
      imageUrl: currentProduct.imageUrl,
      price: Number(price),
      size: currentProduct.sizes[currentActiveColor],
      color: currentProduct.colors[currentActiveSize],
    };

    sessionStorage.setItem("orderSendStatus", "false");

    dispatch({
      type: "ADD_ITEM_CART",
      payload: obj,
    });
  };

  React.useEffect(() => {
    if (currentActiveColor !== false && currentActiveSize !== false) {
      setButtonActive(true);
    }
  }, [currentActiveColor, currentActiveSize]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="navigation">
        <div className="dots slider-usual">{dots}</div>
      </div>
    ),
    customPaging: (i) => <span></span>,
  };

  return (
    <div id="product-info">
      <div className="gallery">
        <Slider className="container centered" {...settings}>
          {currentProduct.imageGalery.map((item, i) => {
            return (
              <div key={`${item}_${i}`}>
                <img src={item.url} alt={`product-image-${item.id}`} />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="information text-contains">
        <div className="text-block">
          <p>{currentProduct.text}</p>
        </div>
        <div className="price">
          {currentProduct.price.old ? (
            <>
              <p className="old">${currentProduct.price.old}</p>
              <p className="sale">${currentProduct.price.new}</p>
            </>
          ) : (
            <p>${currentProduct.price}</p>
          )}
        </div>
        <ProductSelectors
          sizes={currentProduct.sizes}
          currentActive={currentActiveSize}
          setCurrentActive={setCurrentActiveSize}
        />
        <ProductSelectors
          colors={currentProduct.colors}
          currentActive={currentActiveColor}
          setCurrentActive={setCurrentActiveColor}
        />
        <div className="add-to-cart">
          <Button
            className={classNames({ disabled: !buttonActive })}
            onClick={() => handleAddToCart()}
            usual
            cta
          >
            <p>Add to cart</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
