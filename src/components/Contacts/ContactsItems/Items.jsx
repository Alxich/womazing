import React from "react";

function Items({ title, text }) {
  return (
    <div className="item">
      <div className="text-block">
        <p>{title}</p>
      </div>
      <div className="title">
        <h4>{text}</h4>
      </div>
    </div>
  );
}

export default Items;
