const initialState = {
  message: {},
  isValid: false,
  messageStatus: null,
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        message: action.payload,
        isValid: true,
      };
    case "SET_MESSAGE_ERROR":
      return {
        ...state,
        messageStatus: action.payload,
        isValid: false,
      };
    case "SET_MESSAGE_SUCCESS":
      return {
        ...state,
        messageStatus: action.payload,
        isValid: true,
      };
    case "GET_MESSAGE_STATUS":
      return {
        ...state.messageStatus,
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
