import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { Button } from "./index";
import { validateFields } from "../Validations/Validations";
import { sendMessage, getValidationStatus } from "../redux/actions/contacts";

function CallbackPopup({ isOpenPopUp, onPopUpClose }) {
  const dispatch = useDispatch();
  const [state, setThisState] = React.useState({
    fields: {
      Name: "",
      Email: "",
      Phone: "",
    },
    errors: {
      Name: "",
      Email: "",
      Phone: "",
    },
  });
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (e) => {
    setThisState({
      errors: {
        ...state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
      fields: {
        ...state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fields } = state;
    const errorsForm = validateFields.runValidationMethod(fields);

    if (errorsForm) {
      setThisState({ fields: { ...fields }, errors: errorsForm });
      return;
    }

    if (fields.Name && fields.Email && fields.Phone) {
      const data = {
        Name: fields.Name,
        Email: fields.Email,
        Phone: fields.Phone,
      };

      dispatch(sendMessage(data));
    }
  };

  const { fields, errors } = state;

  React.useEffect(() => {
    setIsSuccess(dispatch(getValidationStatus()));
  }, []);

  return (
    <div id="callback-popup" className={classNames({ active: isOpenPopUp })}>
      {!isSuccess ? (
        <div className="container column centered">
          <div className="close" onClick={() => onPopUpClose()}>
            <div className="content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="title">
            <h3>Order a callback</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="name"
              name="Name"
              value={fields.Name}
              className={classNames({ invalid: errors.Name })}
              onChange={(e) => handleChange(e)}
              placeholder="Name"
            />
            <input
              type="email"
              name="Email"
              value={fields.Email}
              className={classNames({ invalid: errors.Email })}
              onChange={(e) => handleChange(e)}
              placeholder="E-mail"
            />
            <input
              type="number"
              name="Phone"
              value={fields.Phone}
              className={classNames({ invalid: errors.Phone })}
              onChange={(e) => handleChange(e)}
              placeholder="Phone"
            />
            <Button
              className="button"
              usual
              cta
              centered
              fullWidth
              onClick={(e) => handleSubmit(e)}
            >
              Order a call
            </Button>
          </form>
        </div>
      ) : (
        <div className="container column centered">
          <div className="title">
            <h3>Excellent! We will call you back soon.</h3>
          </div>
          <Button
            className="button"
            outline
            centered
            fullWidth
            onClick={() => onPopUpClose()}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default CallbackPopup;
