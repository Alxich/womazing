import { combineReducers } from "redux";
import products from "./products";
import contacts from "./contacts";
import cart from "./cart";
import order from "./order";

const rootReducers = combineReducers({ products, contacts, cart, order });

export default rootReducers;
