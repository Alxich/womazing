const initialState = {
  order: {},
  isValid: false,
  orderStatus: null,
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_ORDER":
      return {
        ...state,
        order: action.payload,
        isValid: true,
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

export default contacts;
