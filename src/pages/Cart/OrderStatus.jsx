import React from "react";
import { TitleBread, Button } from "../../components";

import orderReceived from "../../assets/img/order-received.svg";
import orderFailed from "../../assets/img/order-failed.svg";
import { Link } from "react-router-dom";

function OrderStatus({ statusOrder }) {
  return (
    <div id="order-status">
      <div className="container centered column">
        <TitleBread
          title={statusOrder ? "Order received" : "Order not received"}
        />
        <div className="content">
          <div className="status">
            <div className="thumbnail">
              <img
                src={statusOrder ? orderReceived : orderFailed}
                alt="image-order-status"
              />
            </div>
            {statusOrder ? (
              <div className="text-content">
                <div className="title">
                  <h3>The order has been successfully placed</h3>
                </div>
                <div className="text-block">
                  <p>We will contact you soon!</p>
                </div>
              </div>
            ) : (
              <div className="text-content">
                <div className="title">
                  <h3>The order has not been proceed</h3>
                </div>
                <div className="text-block">
                  <p>
                    We will contact you soon to fix that problem or you can get
                    in contact with us in footer below or our {""}
                    <a
                      href="mailto:exampleemail@gmail.com"
                      rel="noreferrer"
                      target="_self"
                    >
                      online email address
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/">
            <Button className="button" cta outline>
              Go to the main page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
