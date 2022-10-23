import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import { Button } from "../index";
import { validateFields } from "../../Validations/Validations";
import {
  sendMessage,
  getMessageStatus,
  getValidationStatus,
} from "../../redux/actions/contacts";

import contactsImage from "../../assets/img/contacts-image.png";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
      },
      errors: {
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitCalled = false;
    this.isAllValid = localStorage.getItem("messageSend");
  }

  handleChange = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: validateFields.runValidate(
          e.target.name,
          e.target.value
        ),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { fields } = this.state;
    const errorsForm = validateFields.runValidationMethod(fields);

    this.submitCalled = true;

    if (errorsForm) {
      this.setState({ errors: errorsForm });
      this.isAllValid = false;
      return;
    }

    if (fields.Name && fields.Email && fields.Message && fields.Phone) {
      const data = {
        Name: fields.Name,
        Email: fields.Email,
        Message: fields.Message,
        Phone: fields.Phone,
      };

      localStorage.setItem("messageSend", dispatch(getValidationStatus()));
      dispatch(sendMessage(data));
    }
  };

  render() {
    const { fields, errors } = this.state;
    const messageState = this.props.dispatch(getMessageStatus());

    return (
      <div id="form">
        <div className="container centered spaced full-width">
          <div className="form-container">
            <div className="title">
              <h3>Write to us</h3>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="name"
                name="Name"
                value={fields.Name}
                className={classNames({ invalid: errors.Name })}
                onChange={(e) => this.handleChange(e)}
                placeholder="Name"
              />
              <input
                type="email"
                name="Email"
                value={fields.Email}
                className={classNames({ invalid: errors.Email })}
                onChange={(e) => this.handleChange(e)}
                placeholder="E-mail"
              />
              <input
                type="number"
                name="Phone"
                value={fields.Phone}
                className={classNames({ invalid: errors.Phone })}
                onChange={(e) => this.handleChange(e)}
                placeholder="Phone"
              />
              <textarea
                className={classNames({ invalid: errors.Message })}
                name="Message"
                value={fields.Message}
                onChange={(e) => this.handleChange(e)}
                placeholder="Message"
              />
              <Button className="button" usual send onClick={this.handleSubmit}>
                Send
              </Button>
              {this.isAllValid ? (
                <div className="form-message text-block success centered">
                  <p>
                    Message was send and received. We will get in touch with you
                    soon.
                  </p>
                </div>
              ) : (
                <div className="form-message text-block error">
                  <p>{messageState}</p>
                </div>
              )}
            </form>
          </div>
          <div className="thumbnail">
            <img src={contactsImage} alt="contacts-image-holder" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Form);
