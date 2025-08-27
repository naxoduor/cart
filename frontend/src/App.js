import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./containers/homepage";
import ListOrders from "./containers/listorders";
import Checkout from "./components/checkout";
import Cart from "./components/cart";
import UpdateProduct from "./details/additions/update";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/forgotpassword";
import ItemDetails from "./components/customcomponents/ItemDetails";
import {
  fetchShippingRegions,
  authorizeCheckout,
  generateUniqueCartId,
  fetchCatalogueProducts,
  searchProductsByParam
} from "./action/requestActions";
import "./App.css";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import AddProduct from "./details/additions/addproduct";
import PrimarySearchAppBar from "./components/navbar/navbartwo";
import Navbar from "./components/navbar/navbarthree";

function App(props) {
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      props.authorizeCheckout(token);
    }

    if (!localStorage.getItem("cartId")) {
      props.generateUniqueCartId();
    }
  });

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCart, setShowcart] = useState(false);

  const toggleSignInModal = () => setShowSignInModal((value) => !value);

  const toggleSignUpModal = () => setShowSignUpModal((value) => !value);

  const toggleForgotPassword = () => setShowForgotPassword((state) => !state);

  const fetchCatalogueProducts = () => {
    props.fetchCatalogueProducts(0);
  };

  const searchProducts = (searchParam) =>{
    props.searchProductsByParam(searchParam)
  }

  return (
    <div className="w-70">
      <Navbar fetchCatalogueProducts={fetchCatalogueProducts} searchProducts={searchProducts} />

      {/* <PrimarySearchAppBar fetchCatalogueProducts={fetchCatalogueProducts} searchProducts={searchProducts} /> */}
      {/* <SignIn show={showSignInModal} handleClose={toggleSignInModal} />
        <SignUp
          show={showSignUpModal}
          handleClose={toggleSignUpModal}
          displaySignIn={toggleSignInModal}
        /> */}
      <ForgotPassword
        showForgotPass={showForgotPassword}
        handleCloseOpen={toggleForgotPassword}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              fetchCatalogueProducts={fetchCatalogueProducts}
              toggleSignInModal={toggleSignInModal}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              showSignInModal={showSignInModal}
              toggleSignInModal={toggleSignInModal}
            />
          }
        />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/allorders" element={<ListOrders />} />
        <Route path="/products/*" element={<ItemDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    generateUniqueCartId: () => dispatch(generateUniqueCartId()),
    authorizeCheckout: (token) => dispatch(authorizeCheckout(token)),
    fetchCatalogueProducts: (page) => dispatch(fetchCatalogueProducts(page)),
    searchProductsByParam: (searchParam) => dispatch(searchProductsByParam(searchParam))
  };
};
export default connect(null, mapDispatchToProps)(App);
