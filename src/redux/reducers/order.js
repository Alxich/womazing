const initialState = {
  order: [],
  ordersContainer: [],
  isValid: false,
  isLoaded: false,
  orderStatus: null,
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return {
        ...state,
        order: action.payload,
        isValid: true,
        isLoaded: true,
      };
    case "FETCH_ORDERS":
      return {
        ...state,
        ordersContainer: action.payload,
        isValid: true,
        isLoaded: true,
      };
    case "SEND_ORDER":
      return {
        ...state,
        order: action.payload,
        isValid: true,
      };
    case "REMOVE_ORDER":
      return {
        ...state,
        isLoaded: true,
      };
    case "SET_ORDER_ERROR":
      return {
        ...state,
        orderStatus: action.payload,
        isValid: false,
      };
    case "SET_ORDER_SUCCESS":
      return {
        ...state,
        orderStatus: action.payload,
        isValid: true,
      };
    case "GET_ORDER_STATUS":
      return {
        ...state.orderStatus,
      };
    case "GET_VALID_STATUS":
      return {
        ...state.isValid,
      };
    default: {
      return state;
    }
  }
};

export default orders;
