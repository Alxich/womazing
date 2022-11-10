import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import classNames from "classnames";

import TableBlock from "./Table";
import AdminProduct from "./Product";
import AdminMessage from "./Message";
import {
  fetchProduct,
  fetchProducts,
  removeProduct,
} from "../../redux/actions/products";
import {
  fetchMessage,
  fetchMessages,
  removeMessage,
} from "../../redux/actions/contacts";
import { fetchOrders, removeOrder } from "../../redux/actions/order";
import { PageNotFound } from "../../pages";

import logo from "../../assets/img/logo-white.svg";
import adminIcon from "../../assets/img/admin-ico.jpg";
import AdminHome from "./AdminHome";

function AdminPanel({ setIsAdmin, dispatch }) {
  const location = useLocation();
  const { pathname } = location;

  /*
   *  0 - product
   *  1 - message
   *  2 - order
   */

  const [categoryAdmin, setCategoryAdmin] = React.useState(0);
  const [sidepanelActive, setSidepanelActive] = React.useState(false);

  const [currentProductId, setCurrentProductId] = React.useState(
    location.state ? location.state.productId : 0
  );

  const [currentMessageId, setCurrentMessageId] = React.useState(
    location.state ? location.state.messageId : 0
  );

  const [categorySelected] = React.useState(
    location.state ? location.state.category : null
  );

  const currentProduct = useSelector(({ products }) => products.product);
  const currentMessage = useSelector(({ contacts }) => contacts.message);

  React.useLayoutEffect(() => {
    dispatch(fetchProduct(currentProductId));
  }, [currentProductId, dispatch]);

  React.useLayoutEffect(() => {
    currentMessageId !== 0 && dispatch(fetchMessage(currentMessageId));
  }, [currentMessageId, dispatch]);

  React.useEffect(() => {
    switch (pathname) {
      case "/admin/":
        setCategoryAdmin(0);
        break;
      case "/admin/products":
        setCategoryAdmin(1);
        break;
      case "/admin/messages":
        setCategoryAdmin(2);
        break;
      case "/admin/orders":
        setCategoryAdmin(3);
        break;
      default:
        setCategoryAdmin(0);
        break;
    }

    switch (categoryAdmin) {
      case 1:
        categorySelected
          ? dispatch(fetchProducts(categorySelected))
          : dispatch(fetchProducts(null));
        break;
      case 2:
        dispatch(fetchMessages());
        break;
      case 3:
        dispatch(fetchOrders());
        break;
      default:
        dispatch(fetchProducts(null));
        break;
    }
  }, [categoryAdmin, categorySelected, dispatch, pathname]);

  const categories = ["Home", "Products", "Messages", "Orders"];

  const removeOrderHandler = (id) => {
    dispatch(removeOrder(id));
  };

  const removeProductHandler = (id) => {
    dispatch(removeProduct(id));
  };

  const removeMessageHandler = (id) => {
    dispatch(removeMessage(id));
  };

  return (
    <>
      <header className="masthead admin">
        <div className="container centered spaced full-height">
          <Link to="/" className="logo">
            <img src={logo} alt="womazing-logo" />
          </Link>
          <div
            className="admin-shows"
            onClick={() => setSidepanelActive(!sidepanelActive ? true : false)}
          >
            <div className="info">
              <div className="title">
                <p>Admin</p>
              </div>
              <div className="text-block">
                <p>Hello there Admin !</p>
              </div>
            </div>
            <div className="icon">
              <img src={adminIcon} alt="admin-ico" />
            </div>
          </div>
        </div>
      </header>
      <main className="wrapper admin">
        <div
          id="admin-sidepanel"
          className={classNames({
            active: sidepanelActive,
          })}
        >
          <ul className="navigation">
            {categories.map((item, i) => {
              return (
                <li
                  className={categoryAdmin === i ? "active" : ""}
                  onClick={() => setCategoryAdmin(i)}
                  key={`${item}__${i}`}
                >
                  <Link
                    to={`/admin/${
                      item.toLocaleLowerCase() === "home"
                        ? ""
                        : item.toLocaleLowerCase()
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="log-out" onClick={() => setIsAdmin(true)}>
            <p>Log-out</p>
          </div>
        </div>
        <div className="container centered column">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AdminHome
                  setIsAdmin={setIsAdmin}
                  setCategoryAdmin={setCategoryAdmin}
                />
              }
            />
            <Route
              exact
              path="/products"
              element={
                <TableBlock
                  categoryAdmin={categoryAdmin}
                  setCurrentProductId={setCurrentProductId}
                  removeProductHandler={removeProductHandler}
                />
              }
            />
            <Route
              exact
              path="/messages"
              element={
                <TableBlock
                  categoryAdmin={categoryAdmin}
                  setCurrentMessageId={setCurrentMessageId}
                  removeMessageHandler={removeMessageHandler}
                />
              }
            />
            <Route
              exact
              path="/orders"
              element={
                <TableBlock
                  categoryAdmin={categoryAdmin}
                  removeOrderHandler={removeOrderHandler}
                />
              }
            />
            <Route
              exact
              path="/product/:productName"
              element={
                currentProductId ? (
                  <AdminProduct currentProduct={currentProduct} />
                ) : (
                  <PageNotFound />
                )
              }
            />
            <Route
              exact
              path="/message/:messageId"
              element={
                currentMessage ? (
                  currentMessage.name ? (
                    <AdminMessage currentMessage={currentMessage} />
                  ) : (
                    <PageNotFound />
                  )
                ) : (
                  <PageNotFound />
                )
              }
            />
            <Route exact path="/new_product/" element={<AdminProduct />} />
            <Route exact path="/new_message/" element={<AdminMessage />} />
          </Routes>
        </div>
      </main>
      <footer className="colophon admin">
        <div className="container centered spaced">
          <div className="brands-container col">
            <Link to="/" className="logo">
              <img src={logo} alt="brand-logo-white" />
            </Link>
            <ul className="privacy">
              <li>© All rights reserved</li>
            </ul>
          </div>
          <div className="col">
            <ul className="privacy">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/privacy">Public offer</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AdminPanel;
