import React from "react";
import { Button } from "../index";
import { validateFields } from "../../Validations/Validations";
import classNames from "classnames";

function Actions({ setCupponCode, onClearCart }) {
  const [cupponInput, setCupponInput] = React.useState("");
  const [invalidInput, setInvalidInput] = React.useState(false);

  const cupponClick = (e) => {
    e.preventDefault();

    setCupponCode(cupponInput);
    setCupponInput("");
  };

  const changeHandler = (e) => {
    if (!validateFields.runValidate("Name", e.target.value)) {
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
    setCupponInput(e.target.value);
  };

  const onClearHandler = (e) => {
    e.preventDefault();

    onClearCart();
  };

  return (
    <div className="cart-actions">
      <div className="coupon">
        <input
          className={classNames({ invalid: invalidInput })}
          type="text"
          onChange={(e) => changeHandler(e)}
          value={cupponInput}
          placeholder="Write yout coupon"
        />
        <Button
          className={classNames("button", { invalid: invalidInput })}
          onClick={(e) => cupponClick(e)}
          cta
          outline
        >
          Use coupon
        </Button>
      </div>
      <Button
        className="button"
        onClick={(e) => onClearHandler(e)}
        cta
        outline
        cart
      >
        Clear all cart
      </Button>
    </div>
  );
}

export default Actions;
