import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../store";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload: payload,
});

export const setError = (payload) => ({
  type: "SET_ORDER_ERROR",
  payload: payload,
});

export const setSuccess = (payload) => ({
  type: "SET_ORDER_SUCCESS",
  payload: payload,
});

export const fetchOrders = () => (dispatch) => {
  dispatch({
    type: "SET_LOADED",
    payload: false,
  });
  axios.get(`/orders/`).then(({ data }) => {
    dispatch(setOrders(data));
  });
};

export const fetchOrder = (id) => (dispatch) => {
  dispatch({
    type: "SET_LOADED",
    payload: false,
  });
  axios.get(`/orders/${id}`).then(({ data }) => {
    dispatch(setOrder(data));
  });
};

export const removeOrder = (id) => (dispatch) => {
  dispatch({
    type: "REMOVE_ORDER",
    payload: false,
  });
  axios.delete(`/orders/${id}`).then((response) => {
    setSuccess("The order was delete successfully {" + response + "}");
  });
};

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

  const { orders } = store.getState();

  if (orders.orderStatus) {
    return orders.orderStatus;
  } else {
    return "Please check your fields to be valid";
  }
};

export const getValidationStatus = () => (dispatch) => {
  dispatch({
    type: "GET_VALID_STATUS",
  });

  const { orders } = store.getState();

  return orders.isValid;
};

export const setOrders = (items) => ({
  type: "FETCH_ORDERS",
  payload: items,
});

export const setOrder = (item) => ({
  type: "FETCH_ORDER",
  payload: item,
});