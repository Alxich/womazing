const initialState = {
  items: [],
  product:
    sessionStorage.getItem("currentProduct") !== "undefined"
      ? JSON.parse(sessionStorage.getItem("currentProduct"))
      : [],
  isLoaded: false,
  isValid: false,
  productStatus: false,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case "SET_PRODUCT":
      sessionStorage.setItem("currentProduct", JSON.stringify(action.payload));
      window.dispatchEvent(new Event("storage"));
      return {
        ...state,
        product:
          action.payload !== "undefined"
            ? action.payload
            : sessionStorage.getItem("currentProduct") !== "undefined" &&
              JSON.parse(sessionStorage.getItem("currentProduct")),
        isLoaded: true,
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case "POST_PRODUCT":
      return {
        ...state,
        product: action.payload,
        isValid: true,
      };
    case "SET_PRODUCT_ERROR":
      return {
        ...state,
        productStatus: action.payload,
        isValid: false,
      };
    case "SET_PRODUCT_SUCCESS":
      return {
        ...state,
        productStatus: action.payload,
        isValid: true,
      };
    case "GET_VALID_STATUS":
      return {
        ...state.isValid,
      };
    case "SET_LOADED":
      return {
        ...state,
        isLoaded: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default products;
