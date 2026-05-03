import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./containers/homepage";
import ListOrders from "./containers/listorders";
import Checkout from "./components/checkout";
import Cart from "./components/cart";
import UpdateProduct from "./details/additions/update";
import ForgotPassword from "./auth/forgotpassword";
import ItemDetails from "./components/customcomponents/ItemDetails";
import NotFound from "./components/NotFound";
import {
  authorizeCheckout,
  generateUniqueCartId,
  fetchCatalogueProducts,
  searchProductsByParam,
} from "./action/requestActions";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import AddProduct from "./details/additions/addproduct";
import Navbar from "./components/navbar/navbarthree";
import { updatePageSEO, addOrganizationSchema, addWebsiteSchema } from "./utils/seoConfig";
import { Box, Container, Paper, Fade, CssBaseline } from "@mui/material";

function App({ authorizeCheckout, generateUniqueCartId, fetchCatalogueProducts, searchProductsByParam }) {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authorizeCheckout(token);
    }

    if (!localStorage.getItem("cartId")) {
      generateUniqueCartId();
    }
  }, [authorizeCheckout, generateUniqueCartId]);

  useEffect(() => {
    updatePageSEO(location.pathname);
    addOrganizationSchema();
    addWebsiteSchema();
  }, [location.pathname]);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForgotPassword = () => setShowForgotPassword((prev) => !prev);

  const handleFetchCatalogueProducts = () => {
    fetchCatalogueProducts(0);
  };

  const handleSearchProducts = (searchParam) => {
    searchProductsByParam(searchParam);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          backgroundAttachment: "fixed",
          color: "text.primary",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          },
        }}
      >
        <Navbar
          fetchCatalogueProducts={handleFetchCatalogueProducts}
          searchProducts={handleSearchProducts}
        />

        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, md: 4 },
            px: { xs: 2, md: 3 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <ForgotPassword
            showForgotPass={showForgotPassword}
            handleCloseOpen={toggleForgotPassword}
          />

          <Fade in={true} timeout={800}>
            <Paper
              component="main"
              elevation={0}
              sx={{
                minHeight: "calc(100vh - 120px)",
                borderRadius: { xs: 0, md: 3 },
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomePage fetchCatalogueProducts={handleFetchCatalogueProducts} />
                    }
                  />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/updateproduct" element={<UpdateProduct />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                  <Route path="/allorders" element={<ListOrders />} />
                  <Route path="/products/*" element={<ItemDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
            </Paper>
          </Fade>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 4,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ opacity: 0.8, fontSize: "0.875rem" }}>
              © 2026 Online Shop. All rights reserved. | Built with ❤️ using React & Material-UI
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  generateUniqueCartId: () => dispatch(generateUniqueCartId()),
  authorizeCheckout: (token) => dispatch(authorizeCheckout(token)),
  fetchCatalogueProducts: (page) => dispatch(fetchCatalogueProducts(page)),
  searchProductsByParam: (searchParam) => dispatch(searchProductsByParam(searchParam)),
});

export default connect(null, mapDispatchToProps)(App);

