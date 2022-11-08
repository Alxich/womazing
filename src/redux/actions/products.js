import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../store";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload: payload,
});

export const setSuccess = (payload) => ({
  type: "SET_PRODUCT_SUCCESS",
  payload: payload,
});

export const setError = (payload) => ({
  type: "SET_PRODUCT_ERROR",
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

export const postProduct =
  ({ ImageUrl, ImageGalery, Name, Category, Price, Text, Sizes, Colors }) =>
  (dispatch) => {
    if (getValidationStatus()) {
      // no errors submit the form
      dispatch({
        type: "POST_PRODUCT",
        payload: false,
      });
      axios
        .post("/products/", {
          id: uuidv4(),
          imageUrl: ImageUrl,
          imageGalery: ImageGalery,
          name: Name,
          category: Category,
          price: Price.new > 0 ? Price : Price.old,
          text: Text,
          sizes: Sizes,
          colors: Colors,
        })
        .then((response) => {
          setSuccess("The product was posted successfully  {" + response + "}");
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("Please check your fields to be valid");
    }
  };

export const updateProduct =
  ({ Id, ImageUrl, ImageGalery, Name, Category, Price, Text, Sizes, Colors }) =>
  (dispatch) => {
    if (getValidationStatus()) {
      // no errors submit the form
      dispatch({
        type: "POST_PRODUCT",
        payload: false,
      });
      axios
        .put(`/products/${Id}`, {
          id: Id,
          imageUrl: ImageUrl,
          imageGalery: ImageGalery,
          name: Name,
          category: Category,
          price: Price.new > 0 ? Price : Price.old,
          text: Text,
          sizes: Sizes,
          colors: Colors,
        })
        .then((response) => {
          setSuccess("The product was posted successfully {" + response + "}");
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("Please check your fields to be valid");
    }
  };

export const removeProduct = (id) => (dispatch) => {
  dispatch({
    type: "SET_LOADED",
    payload: false,
  });
  axios.delete(`/products/${id}`).then(() => {
    dispatch(fetchProducts(null));
  });
};

export const getValidationStatus = () => (dispatch) => {
  dispatch({
    type: "GET_VALID_STATUS",
  });

  const { products } = store.getState();

  return products.isValid;
};

export const setProducts = (items) => ({
  type: "SET_PRODUCTS",
  payload: items,
});

export const setProduct = (product) => ({
  type: "SET_PRODUCT",
  payload: product,
});
