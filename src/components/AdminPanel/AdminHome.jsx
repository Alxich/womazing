import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMessages } from "../../redux/actions/contacts";
import { fetchOrders } from "../../redux/actions/order";
import { fetchProducts } from "../../redux/actions/products";
import TitleBread from "../TitleBread";

function AdminHome({ setIsAdmin, setCategoryAdmin }) {
  const dispatch = useDispatch();

  const products = useSelector(({ products }) => products.items);
  const messages = useSelector(({ contacts }) => contacts.messages);
  const orders = useSelector(({ orders }) => orders.ordersContainer);

  React.useEffect(() => {
    dispatch(fetchProducts(null));
    dispatch(fetchMessages());
    dispatch(fetchOrders());
  }, []);

  return (
    <>
      <TitleBread title="Welcome admin !" className="container centered" />
      <div id="admin-home" className="container column">
        <div className="title section">
          <h3>There is all information about components</h3>
        </div>
        <div className="container to-left collection wrap three-line">
          <div className="item">
            <div className="title">
              <h4>Products</h4>
            </div>
            <div className="text-block">
              <p>There is "{products.length}" product</p>
              <Link to="/admin/products" onClick={() => setCategoryAdmin(1)}>
                Show all
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <h4>Messages</h4>
            </div>
            <div className="text-block">
              <p>There is "{messages.length}" messages</p>
              <Link to="/admin/messages" onClick={() => setCategoryAdmin(2)}>
                Show all
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <h4>Orders</h4>
            </div>
            <div className="text-block">
              <p>There is "{orders.length}" orders</p>
              <Link to="/admin/orders" onClick={() => setCategoryAdmin(3)}>
                Show all
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <h4>Admin commands</h4>
            </div>
            <div className="text-block actions">
              <p onClick={() => setIsAdmin(true)}>Log out</p>
              <p onClick={() => alert("Hello admin !")}>
                Say hello -{">"} click
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
