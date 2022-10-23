import React from "react";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";

import {
  Button,
  CartActions,
  CartItem,
  CartTotal,
  TitleBread,
} from "../../components";
import {
  clearCart,
  removeCartItem,
  plusCartItem,
  minusCartItem,
} from "../../redux/actions/cart";

import { Link } from "react-router-dom";

function Cart({
  totalPrice,
  totalCount,
  cartItems,
  cupponCode,
  setCupponCode,
}) {
  const dispatch = useDispatch();

  const addedItems = Object.keys(cartItems).map((key) => {
    return cartItems[key].items[0];
  });

  const onRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const onPlusCartItem = (id) => {
    dispatch(plusCartItem(id));
  };

  const onMinusCartItem = (id) => {
    dispatch(minusCartItem(id));
  };

  const onClearCart = () => {
    dispatch(clearCart());
  };

  const addedItemsCn = addedItems.map((item, id) => {
    return (
      <CartItem
        id={item.id}
        title={item.name}
        image={item.imageUrl}
        color={item.color}
        size={item.size}
        price={item.price}
        total={cartItems[item.id].totalPrice}
        amount={cartItems[item.id].items.length}
        onRemoveItem={onRemoveItem}
        onPlusCartItem={onPlusCartItem}
        onMinusCartItem={onMinusCartItem}
        key={`${item.name}__${id}`}
      />
    );
  });

  React.useEffect(() => {
    toast(
      "Please click on item quantity change in a cart then next on the button +/- for changing the item quantity in your cart.",
      {
        icon: "⚠️",
        duration: 7000,
        style: {
          background: "#100F0F",
          borderRadius: "5px",
          fontSize: "0.85rem",
          color: "#fff",
        },
      }
    );
  }, []);

  if (addedItems.length) {
    return (
      <>
        <div id="cart">
          <div className="container column centered">
            <TitleBread title="Cart" />
            <form className="cart-content container centered full-width column">
              <div className="labels title">
                <div className="item name">
                  <h4>Goods</h4>
                </div>
                <div className="item price">
                  <h4>Price</h4>
                </div>
                <div className="item quantity">
                  <h4>Quantity</h4>
                </div>
                <div className="item total">
                  <h4>In total</h4>
                </div>
              </div>
              <div className="content items-container container centered column">
                {addedItemsCn}
              </div>
              <CartActions
                setCupponCode={setCupponCode}
                onClearCart={onClearCart}
              />
              <CartTotal totalPrice={totalPrice} cupponCode={cupponCode} />
            </form>
          </div>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </>
    );
  } else {
    return (
      <>
        <div id="cart" className="empty">
          <div className="container column centered full-height">
            <div className="title center">
              <h2>Cart seems like to be empty</h2>
              <p>
                Please follow the button and add some products that you like.
              </p>
            </div>
            <Link to="/shop">
              <Button className="button" outline centered>
                Open a shop
              </Button>
            </Link>
          </div>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </>
    );
  }
}

export default Cart;
