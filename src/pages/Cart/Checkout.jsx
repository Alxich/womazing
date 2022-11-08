import React from "react";
import { connect } from "react-redux";

import { FormInputs, OrderInfo, TitleBread } from "../../components";
import { getValidationStatus, sendOrder } from "../../redux/actions/order";
import { validateFields } from "../../Validations/Validations";

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
        Country: "",
        City: "",
        Street: "",
        HouseFlat: "",
        FlatHouseNum: "",
      },
      errors: {
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
        Country: "",
        City: "",
        Street: "",
        HouseFlat: "",
        FlatHouseNum: "",
      },
      isAllValid: false,
      checkboxCheck: false,
    };
    this.totalPrice = this.props.totalPrice;
    this.totalCount = this.props.totalCount;
    this.cartItems = this.props.cartItems;
    this.cupponCode = this.props.cupponCode;
    this.submitCalled = this.props.submitCalled;
    this.isAllValid = false;
    this.checkboxCheck = false;
    this.orderSendStatus = sessionStorage.getItem("orderSendStatus");
  }

  setCheckboxCheck = (value) => {
    this.setState({ checkboxCheck: value });
  };

  setIsAllValid = (value) => {
    this.setState({ isAllValid: value });
  };

  setSubmitCalled = (value) => {
    this.setState({ submitCalled: value });
  };

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
    const { fields, checkboxCheck } = this.state;
    const errorsForm = validateFields.runValidationMethod(fields);

    this.setSubmitCalled(true);

    if (errorsForm) {
      if (checkboxCheck) {
        this.setState({ errors: errorsForm });
        this.setIsAllValid(false);
        return;
      }
    }

    if (fields.Name && fields.Email && fields.Message && fields.Phone) {
      const data = {
        Name: fields.Name,
        Email: fields.Email,
        Message: fields.Message,
        Phone: fields.Phone,
        Country: fields.Country,
        City: fields.City,
        Street: fields.Street,
        HouseFlat: fields.HouseFlat,
        FlatHouseNum: fields.FlatHouseNum,
      };

      sessionStorage.setItem("orderSendStatus", "true");
      this.setIsAllValid(dispatch(getValidationStatus()));
      dispatch(sendOrder(data));
    }
  };

  render() {
    const { fields, errors, checkboxCheck, isAllValid } = this.state;
    return (
      <div id="checkout">
        <div className="container centered column">
          <TitleBread title="Order processing" />
          <form
            className="container centered spaced left"
            onSubmit={this.handleSubmit}
          >
            <FormInputs
              checkboxCheck={checkboxCheck}
              submitCalled={this.submitCalled}
              isAllValid={isAllValid}
              handleChange={this.handleChange}
              fields={fields}
              errors={errors}
            />
            <OrderInfo
              checkboxCheck={checkboxCheck}
              setCheckboxCheck={this.setCheckboxCheck}
              totalPrice={this.totalPrice}
              totalCount={this.totalCount}
              items={this.cartItems}
              cupponCode={this.cupponCode}
              handleSubmit={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null)(Checkout);
