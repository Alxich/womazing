import React from "react";
import Items from "./Items";

function ContactsItems({ items }) {
  const itemsContainer = items.map((item, i) => {
    return (
      <Items title={item.title} text={item.text} key={`${item.title}_${i}`} />
    );
  });
  return (
    <div id="contacts-items">
      <div className="container centered spaced to-left full-width">
        {itemsContainer}
      </div>
    </div>
  );
}

export default ContactsItems;
