import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../store";

export const setError = (payload) => ({
  type: "SET_MESSAGE_ERROR",
  payload: payload,
});

export const setSuccess = (payload) => ({
  type: "SET_MESSAGE_SUCCESS",
  payload: payload,
});

export const sendMessage =
  ({ Name, Email, Phone, Message }) =>
  (dispatch) => {
    if (getValidationStatus()) {
      // no errors submit the form
      dispatch({
        type: "SEND_MESSAGE",
        payload: false,
      });
      axios
        .post("/contactMessages/", {
          id: uuidv4(),
          name: Name,
          email: Email,
          phone: Phone,
          message: Message,
        })
        .then((response) => {
          setSuccess("The message was sent successfully {" + response + "}");
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("Please check your fields to be valid");
    }
  };

export const getMessageStatus = () => (dispatch) => {
  dispatch({
    type: "GET_MESSAGE_STATUS",
  });

  const { contacts } = store.getState();

  if (contacts.messageStatus) {
    return contacts.messageStatus;
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
