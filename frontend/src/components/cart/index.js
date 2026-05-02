import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  removeCartProduct,
  generateTransactionNumber,
  createOrder,
} from "../../action/requestActions";
import "./cart.css";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { BACKEND_URL } from "../../action/urls";
import axios from "axios"

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, item_id) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, item_id };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function Cart(props) {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const cart_id = localStorage.getItem("cartId");
    const url = `${BACKEND_URL}shoppingcart/${cart_id}`;

    async function fetchData() {
      const response = await axios.get(url);
      setCartData(response.data);
    }

    fetchData();
  }, []);

  const rows = cartData.map((element) => {
    const { name, price } = element.product;
    const item_id = element.item_id;
    const quantity = element.shopping_cart.quantity;
    return createRow(name, quantity, price, item_id);
  });

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const navigate = useNavigate();

  const checkout = () => {
    const transactionNumber = props.generateTransactionNumber();
    const cartId = localStorage.getItem("cartId");
    const order = { cartId, transactionNumber };

    props.createOrder(order);
    navigate("/checkout");
  };

  const handleRemoveCartProduct = (event, item_id) => {
    event.preventDefault();
    props.removeCartProduct(item_id);
  };


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Shopping Cart
        </Typography>
        <Typography color="text.secondary">
          Review your items and checkout when you're ready.
        </Typography>
      </Box>

      <Stack spacing={4}>
        <TableContainer component={Paper} sx={{ overflowX: "auto", boxShadow: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="shopping cart table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "action.hover" }}>
                <TableCell align="center" colSpan={4} sx={{ borderBottom: 0 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Details
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: 0 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Price
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Description
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" fontWeight={600}>
                    Qty.
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" fontWeight={600}>
                    Unit
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" fontWeight={600}>
                    Sum
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" fontWeight={600}>
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Your cart is empty. Add some items to continue.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.item_id} hover>
                    <TableCell>
                      <Typography variant="body1">{row.desc}</Typography>
                    </TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={(e) => handleRemoveCartProduct(e, row.item_id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {rows.length > 0 && (
                <>
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>
                      <Typography variant="subtitle1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {ccyFormat(invoiceSubtotal)}
                      </Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">Tax</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {`${(TAX_RATE * 100).toFixed(0)} %`}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {ccyFormat(invoiceTaxes)}
                      </Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" fontWeight={700}>
                        Total
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" fontWeight={700}>
                        {ccyFormat(invoiceTotal)}
                      </Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            disabled={rows.length === 0}
            onClick={checkout}
            sx={{ px: 6, py: 1.5 }}
          >
            Checkout
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartProduct: (carturl, item_id) =>
      dispatch(removeCartProduct(carturl, item_id)),
    generateTransactionNumber: () => dispatch(generateTransactionNumber()),
    createOrder: (order) => dispatch(createOrder(order))
  };
};

export default connect(null, mapDispatchToProps)(Cart);
