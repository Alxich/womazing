import axios from "axios";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload: payload,
});

export const fetchProduct = (id) => (dispatch) => {
  dispatch({
    type: "SET_LOADED",
    payload: false,
  });
  axios.get(`/products/${id}`).then(({ data }) => {
    dispatch(setProduct(data));
  });
};

export const fetchProducts = (category) => (dispatch) => {
  dispatch({
    type: "SET_LOADED",
    payload: false,
  });
  axios
    .get(`/products?${category === null ? `` : `category=${category}`}`)
    .then(({ data }) => {
      dispatch(setProducts(data));
    });
};

export const setProducts = (items) => ({
  type: "SET_PRODUCTS",
  payload: items,
});

export const setProduct = (product) => ({
  type: "SET_PRODUCT",
  payload: product,
});
