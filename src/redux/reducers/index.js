import { combineReducers } from "redux";
import products from "./products";
import contacts from "./contacts";
import cart from "./cart";
import orders from "./order";
import adminLogin from "./admin";

const rootReducers = combineReducers({
  products,
  contacts,
  cart,
  orders,
  adminLogin,
});

export default rootReducers;
