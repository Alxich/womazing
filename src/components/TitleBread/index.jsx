import classNames from "classnames";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

function TitleBread({ title, product }) {
  return (
    <div
      id="title-bread"
      className={classNames("container column to-left", {
        product: product,
      })}
    >
      <div className="title">
        <h1>{title}</h1>
      </div>
      <Breadcrumbs />
    </div>
  );
}

export default TitleBread;
