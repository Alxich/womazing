const initialState = {
  items: [],
  product: [],
  isLoaded: false,
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
      return {
        ...state,
        product: action.payload,
        isLoaded: true,
      };
    default: {
      return state;
    }
  }
};

export default products;
