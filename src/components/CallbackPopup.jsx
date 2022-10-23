import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Button } from "./index";
import { validateFields } from "../Validations/Validations";
import { sendMessage, getValidationStatus } from "../redux/actions/contacts";

class CallbackPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitCalled = false;
    this.isAllValid = false;
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

    if (fields.Name && fields.Email && fields.Phone) {
      const data = {
        Name: fields.Name,
        Email: fields.Email,
        Phone: fields.Phone,
      };

      dispatch(sendMessage(data));
      this.isAllValid = dispatch(getValidationStatus());
    }
  };

  render() {
    const { fields, errors } = this.state;
    const isSuccess = this.props.dispatch(getValidationStatus());
    const isOpenPopUp = this.props.isOpenPopUp;
    const onPopUpClose = this.props.onPopUpClose;

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
              <Button
                className="button"
                usual
                cta
                centered
                fullWidth
                onClick={this.handleSubmit}
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
}

export default connect(null)(CallbackPopup);
