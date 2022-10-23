import React from "react";

function Item({ icon, title, text }) {
  return (
    <div className="item">
      <div className="thumbnail">
        <img src={icon} alt="thumbnail-icon" />
      </div>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="text-block">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Item;
