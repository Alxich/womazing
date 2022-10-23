import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../store";

export const setError = (payload) => ({
  type: "SET_ORDER_ERROR",
  payload: payload,
});

export const setSuccess = (payload) => ({
  type: "SET_ORDER_SUCCESS",
  payload: payload,
});

export const sendOrder =
  ({
    Name,
    Email,
    Phone,
    Message,
    Country,
    City,
    Street,
    HouseFlat,
    FlatHouseNum,
  }) =>
  (dispatch) => {
    if (getValidationStatus()) {
      // no errors submit the form
      dispatch({
        type: "SEND_ORDER",
        payload: false,
      });
      axios
        .post("/orders/", {
          id: uuidv4(),
          name: Name,
          email: Email,
          phone: Phone,
          message: Message,
          country: Country,
          city: City,
          street: Street,
          houseFlat: HouseFlat,
          flatHouseNum: FlatHouseNum,
        })
        .then((response) => {
          setSuccess("The order was sent successfully {" + response + "}");
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("Please check your fields to be valid");
    }
  };

export const getOrderStatus = () => (dispatch) => {
  dispatch({
    type: "GET_ORDER_STATUS",
  });

  const { contacts } = store.getState();

  if (contacts.orderStatus) {
    return contacts.orderStatus;
  } else {
    return "Please check your fields to be valid";
  }
};

export const getValidationStatus = () => (dispatch) => {
  dispatch({
    type: "GET_VALID_STATUS",
  });

  const { contacts } = store.getState();

  return contacts.isValid;
};
