import React from "react";

function Categories({ selectCategory, activeCategory }) {
  const items = ["Coat", "Sweatshirts", "Cardigans", "Hoodies"];

  const itemsContainer = items.map((title, i) => {
    return (
      <div
        className={`item ${activeCategory === title ? "active" : ""}`}
        onClick={() => {
          selectCategory(title);
        }}
        key={`${title}_${i}`}
      >
        {title}
      </div>
    );
  });

  return (
    <div id="categories">
      <div className="container to-left no-wrap">
        <div
          className={`item ${!activeCategory ? "active" : ""}`}
          onClick={() => {
            selectCategory("");
          }}
        >
          All
        </div>
        {itemsContainer}
      </div>
    </div>
  );
}

export default Categories;
