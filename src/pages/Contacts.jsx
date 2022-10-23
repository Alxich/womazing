import React from "react";
import { TitleBread, Map, ContactsItems, Form } from "../components";

function Contacts() {
  const itemsContainer = [
    { title: "Phone", text: "+39 334 969 1173" },
    { title: "E-mail", text: "info@sitename.com" },
    { title: "Address", text: "Milan, Via Antonio Fogazzaro, 9" },
  ];

  return (
    <div id="contacts">
      <div className="container centered column">
        <TitleBread title="Contacts" />
        <Map />
        <ContactsItems items={itemsContainer} />
        <Form />
      </div>
    </div>
  );
}

export default Contacts;
