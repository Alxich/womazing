import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import {
  Header,
  Footer,
  CallbackPopup,
  BackToTop,
  Sidebar,
} from "../../components";
import {
  About,
  Checkout,
  Contacts,
  Home,
  OrderStatus,
  Product,
  Shop,
  Cart,
  PageNotFound,
} from "../../pages";
import { fetchProduct, fetchProducts } from "../../redux/actions/products";

function User() {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);
  const [isOpenPopUp, setIsOpenPopUp] = React.useState(false);
  const [statusOrder, setStatusOrder] = React.useState(false);
  const [cupponCode, setCupponCode] = React.useState("");
  const orderSendStatus = sessionStorage.getItem("orderSendStatus");

  React.useEffect(() => {
    setStatusOrder(orderSendStatus);
  }, []);

  React.useEffect(() => {
    setStatusOrder(orderSendStatus);
  }, [orderSendStatus]);

  const location = useLocation();
  const dispatch = useDispatch();

  const [currentProductId, setCurrentProductId] = React.useState(
    location.state ? location.state.productId : 0
  );
  const [categorySelected, setCategorySelect] = React.useState(
    location.state ? location.state.category : null
  );

  const currentProduct = useSelector(({ products }) => products.product);
  const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);

  const handleProductId = (id) => {
    setCurrentProductId(id);
  };

  const handleShopCat = (cat) => {
    setCategorySelect(cat);
  };

  React.useEffect(() => {
    dispatch(fetchProduct(currentProductId));
    dispatch(fetchProducts(null));
  }, [currentProductId]);

  const onOpenSidebar = () => {
    !isOpenSidebar ? setIsOpenSidebar(true) : setIsOpenSidebar(false);
  };

  const handleOpenPopUp = () => {
    isOpenPopUp ? setIsOpenPopUp(false) : setIsOpenPopUp(true);
  };

  const { pathname } = location;
  const locationPath = pathname;

  const isHomePage = (path) => {
    return location.pathname === path && true;
  };

  const navigationLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
      subMenu: [
        {
          name: "Coat",
          link: "/shop",
        },
        {
          name: "Sweatshirts",
          link: "/shop",
        },
        {
          name: "Cardigans",
          link: "/shop",
        },
        {
          name: "Hoodies",
          link: "/shop",
        },
      ],
    },
    {
      name: "About the brand",
      link: "/about",
    },
    {
      name: "Contacts",
      link: "/contacts",
    },
  ];

  return (
    <>
      <div
        className={classNames("container full-width column centered", {
          "move-to-left": isOpenSidebar,
        })}
      >
        <div id="scroll-top-behavior" style={{ visibility: "hidden" }}></div>
        <Header
          onMobileOpen={onOpenSidebar}
          isOpenSidebar={isOpenSidebar}
          onPopUpOpen={handleOpenPopUp}
          navigationLinks={navigationLinks}
          locationPath={locationPath}
        />
        <main
          className={classNames("wrapper", {
            home: isHomePage("/"),
          })}
        >
          <Routes>
            <Route
              exact
              path="/"
              element={<Home handleProduct={handleProductId} />}
            />
            <Route
              exact
              path="/shop/"
              element={
                <Shop
                  categorySelected={categorySelected}
                  handleShopCat={handleShopCat}
                  handleProduct={handleProductId}
                  handleChangeCat={handleShopCat}
                />
              }
            />
            <Route
              path="/shop/product/:productName"
              element={
                currentProductId ? (
                  <Product
                    currentProduct={currentProduct}
                    handleProduct={handleProductId}
                  />
                ) : (
                  <PageNotFound />
                )
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contacts" element={<Contacts />} />
            <Route
              exact
              path="/cart/order"
              element={<OrderStatus statusOrder={statusOrder} />}
            />
            <Route
              exact
              path="/cart/checkout"
              element={
                orderSendStatus ? (
                  orderSendStatus !== "false" ? (
                    <Navigate to="/cart/order" />
                  ) : totalCount ? (
                    <Checkout
                      totalPrice={totalPrice}
                      totalCount={totalCount}
                      cartItems={items}
                      setStatusOrder={setStatusOrder}
                      cupponCode={cupponCode}
                    />
                  ) : (
                    <PageNotFound />
                  )
                ) : totalCount ? (
                  <Checkout
                    totalPrice={totalPrice}
                    totalCount={totalCount}
                    cartItems={items}
                    setStatusOrder={setStatusOrder}
                    cupponCode={cupponCode}
                  />
                ) : (
                  <PageNotFound />
                )
              }
            />
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  totalPrice={totalPrice}
                  totalCount={totalCount}
                  cartItems={items}
                  cupponCode={cupponCode}
                  setCupponCode={setCupponCode}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer
          navigationLinks={navigationLinks}
          locationPath={locationPath}
          handleShopCat={handleShopCat}
          currentShopCat={categorySelected}
        />
      </div>
      <BackToTop isOpenSidebar={isOpenSidebar} />
      <CallbackPopup isOpenPopUp={isOpenPopUp} onPopUpClose={handleOpenPopUp} />
      <Sidebar
        onMobileClose={onOpenSidebar}
        isOpenSidebar={isOpenSidebar}
        navigationLinks={navigationLinks}
        locationPath={locationPath}
        handleShopCat={handleShopCat}
        currentShopCat={categorySelected}
      />
    </>
  );
}

export default User;
