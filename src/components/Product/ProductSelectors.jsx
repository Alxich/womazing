import classNames from "classnames";
import React from "react";

function ProductSelectors({ sizes, colors, currentActive, setCurrentActive }) {
  const handleActiveClass = (newId) => {
    return currentActive === newId ? true : false;
  };

  const setActiveClass = (newId) => {
    if (currentActive !== newId) {
      setCurrentActive(newId);
    }
  };

  if (sizes) {
    return (
      <div className="product-sizes selectors">
        <div className="title">
          <h4>Choose a size</h4>
        </div>
        <div className="container to-left no-wrap text-block">
          {sizes.map((item, i) => {
            return (
              <div
                className={classNames("item", {
                  active: handleActiveClass(i),
                })}
                onClick={() => setActiveClass(i)}
                key={`${item}__${i}`}
              >
                <p>{item.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (colors) {
    return (
      <div className="product-colors selectors">
        <div className="title">
          <h4>Choose a color</h4>
        </div>
        <div className="container to-left no-wrap">
          {colors.map((item, i) => {
            return (
              <div
                className={classNames("item", {
                  active: handleActiveClass(i),
                })}
                onClick={() => setActiveClass(i)}
                style={{ backgroundColor: `${item.pallete}` }}
                name={`${item.name}`}
                key={`${item.name}__${i}`}
              >
                <span></span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductSelectors;
