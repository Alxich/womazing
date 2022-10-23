import React from "react";

function AboutItem({ title, text, image }) {
  return (
    <div className="item about-item">
      <div className="container centered spaced">
        <div className="thumbnail">
          <img src={image} alt="about-item-image" />
        </div>

        {(title || text) && (
          <div className="content">
            {title && (
              <div className="title to-left">
                <h3>{title}</h3>
              </div>
            )}
            {text && <div className="text-block">{text}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutItem;
