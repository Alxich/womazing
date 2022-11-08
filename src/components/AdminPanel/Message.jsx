import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import TitleBread from "../TitleBread";
import { validateFields } from "../../Validations/Validations";
import { sendMessage, updateMessage } from "../../redux/actions/contacts";
import { Button } from "../index";

function AdminMessage({ currentMessage }) {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    fields: {
      Name: currentMessage && currentMessage.name ? currentMessage.name : "",
      Email: currentMessage && currentMessage.email ? currentMessage.email : "",
      Phone: currentMessage && currentMessage.phone ? currentMessage.phone : "",
      Message:
        currentMessage && currentMessage.message ? currentMessage.message : "",
    },
    errors: {
      Name: "",
      Email: "",
      Phone: "",
      Message: "",
    },
  });

  const handleChange = (e) => {
    setState({
      fields: {
        ...state.fields,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fields } = state;
    console.log(fields);
    const errorsForm = validateFields.runValidationMethod(fields);

    if (errorsForm) {
      setState({ fields: { ...fields }, errors: errorsForm });
      return;
    }

    if (fields.Name && fields.Email && fields.Message && fields.Phone) {
      const data = currentMessage
        ? {
            Id: currentMessage.id,
            Name: fields.Name,
            Email: fields.Email,
            Message: fields.Message,
            Phone: fields.Phone,
          }
        : {
            Name: fields.Name,
            Email: fields.Email,
            Message: fields.Message,
            Phone: fields.Phone,
          };

      currentMessage
        ? dispatch(updateMessage(data))
        : dispatch(sendMessage(data));
    }
  };

  const { fields, errors } = state;

  return (
    <>
      <TitleBread
        title={currentMessage ? "Update message" : "New message"}
        className="container centered"
      />
      <form className="editor-admin">
        <div className="item container column to-left">
          <div className="title">
            <h5>Name</h5>
          </div>
          <div className="name">
            {currentMessage && currentMessage.name && (
              <p className="current">Current name : "{currentMessage.name}"</p>
            )}
            <input
              type="text"
              name="Name"
              value={fields.Name}
              className={classNames({ invalid: errors.Name })}
              onChange={(e) => handleChange(e)}
              placeholder="Please wire name of message"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Email</h5>
          </div>
          <div className="email">
            {currentMessage && currentMessage.email && (
              <p className="current">
                Current email : "{currentMessage.email}"
              </p>
            )}
            <input
              type="email"
              name="Email"
              value={fields.Email}
              className={classNames({ invalid: errors.Email })}
              onChange={(e) => handleChange(e)}
              placeholder="Please write email"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Phone</h5>
          </div>
          <div className="phone">
            {currentMessage && currentMessage.phone && (
              <p className="current">
                Current number : "{currentMessage.phone}"
              </p>
            )}
            <input
              type="number"
              name="Phone"
              value={fields.Phone}
              className={classNames({ invalid: errors.Phone })}
              onChange={(e) => handleChange(e)}
              placeholder="Write here the number"
            />
          </div>
        </div>
        <div className="item container column to-left">
          <div className="title">
            <h5>Message</h5>
          </div>
          <div className="message">
            {currentMessage && currentMessage.text && (
              <p className="current">
                The current text: <br />
                <br />
                {currentMessage.text}
              </p>
            )}
            <textarea
              type="textarea"
              name="Message"
              className={classNames({ invalid: errors.Message })}
              onChange={(e) => handleChange(e)}
              placeholder={
                fields.Message ? fields.Message : "Please fill message area"
              }
              value={fields.Message}
            />
          </div>
        </div>
        <Button usual onClick={(e) => handleSubmit(e)}>
          {currentMessage ? "Update message" : "Upload message"}
        </Button>
      </form>
    </>
  );
}

export default AdminMessage;
