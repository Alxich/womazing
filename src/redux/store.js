import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index";

const composeEnhancers =
  (typeof window != "undefined" && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_) ||
  compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk)) // Used for chrome extension
);

window.store = store;

export default store;
