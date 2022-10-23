import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import { getOrderStatus } from "../../redux/actions/order";

class FormInputs extends React.Component {
  render() {
    const orderState = this.props.dispatch(getOrderStatus());
    const fields = this.props.fields;
    const errors = this.props.errors;
    const submitCalled = this.props.submitCalled;
    const handleChange = this.props.handleChange;
    const isAllValid = this.props.isAllValid;
    const checkboxCheck = this.props.checkboxCheck;

    return (
      <div className="form-inputs">
        <div className="item">
          <div className="title">
            <h3>Buyer data</h3>
          </div>
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
        </div>
        <div className="item">
          <div className="title">
            <h3>Recipient's address</h3>
          </div>
          <input
            type="text"
            placeholder="Country"
            name="Country"
            value={fields.Country}
            className={classNames({ invalid: errors.Country })}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="City"
            name="City"
            value={fields.City}
            className={classNames({ invalid: errors.City })}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Street"
            name="Street"
            value={fields.Street}
            className={classNames({ invalid: errors.Street })}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="House/Flat"
            name="HouseFlat"
            value={fields.HouseFlat}
            className={classNames({ invalid: errors.HouseFlat })}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Flat/House number"
            name="FlatHouseNum"
            value={fields.FlatHouseNum}
            className={classNames({ invalid: errors.FlatHouseNum })}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="item">
          <div className="title">
            <h3>Comments</h3>
          </div>
          <textarea
            className={classNames({ invalid: errors.Message })}
            name="Message"
            value={fields.Message}
            onChange={(e) => handleChange(e)}
            placeholder="Message"
          />
        </div>
        {submitCalled &&
          (checkboxCheck === isAllValid ? (
            <div className="form-message text-block success">
              <p>{orderState}</p>
            </div>
          ) : (
            <div className="form-message text-block error">
              <p>{orderState}</p>
            </div>
          ))}
      </div>
    );
  }
}

export default connect(null)(FormInputs);
