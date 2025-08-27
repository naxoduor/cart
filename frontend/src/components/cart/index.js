import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  removeCartProduct,
  generateTransactionNumber,
  createOrder,
} from "../../action/requestActions";
import "./cart.css";
//import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "../customcomponents/GenericButton";
import { BACKEND_URL } from "../../action/urls";
import axios from 'axios'

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
  const [cartData, setCartData] = useState([])
  const rows = [];

  useEffect( ()=>{
    let cart_id = localStorage.getItem("cartId");
    let url = `${BACKEND_URL}shoppingcart/${cart_id}`;
    
    async function fetchData() {
        const response = await axios.get(url)
        setCartData(response.data)
      }
      fetchData();
    
},[])

  cartData.forEach((element) => {
    const { name, price } = element.product;
    const item_id = element.item_id;
    const quantity = element.shopping_cart.quantity;
    rows.push(createRow(name, quantity, price, item_id));
  });

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const navigate = useNavigate();

  const checkout = (event) => {
    // if (props.authentication.authenticated) {
    let transactionNumber = props.generateTransactionNumber();
    let cartId = localStorage.getItem("cartId");
    let order = {cartId, transactionNumber}
    props.createOrder(order)
    navigate("/checkout");
    
  };

  // const handleAddProduct = (e, item_id) => {
  //   let quantity = e.target.value;
  //   props.updateCartItem(item_id, quantity);
  //   setName("Nax Oduor");
  // };

  const removeCartProduct = (e, item_id) => {
    e.preventDefault();
    props.removeCartProduct(item_id);
    // props.handleClose();
  };


  return (
    // <div className={showHideClassName}>
    <div className="w-100" style={{ textAlign: "center" }}>
      <Typography variant="h5">CART ITEMS</Typography>
      <div className="cart-main">
        <TableContainer component={Paper} className="table-responsive table table-bordered">
          <Table className="table table-bordered table-striped table-hover align-middle" sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead className="table table-bordered table-striped table-hover align-middle">
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  <Typography gutterBottom variant="h4" component="div">
                    Details
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography gutterBottom variant="h4" component="div">
                    
                    Price
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h5">Desc</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5">Qty.</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5">Unit</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5">Sum</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>
                    <Typography variant="h7">{row.desc}</Typography>
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  <TableCell
                    align="right"
                    className="rmvItem"
                    onClick={(e) => removeCartProduct(e, row.item_id)}
                  >
                    <Typography className="text-center"><button className="btn btn-danger btn-sm">Remove</button></Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>
                  <Typography variant="h6">Subtotal</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {ccyFormat(invoiceSubtotal)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Tax</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {ccyFormat(invoiceTaxes)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {ccyFormat(invoiceTotal)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <button className="btn btn-danger w-60 p-20" message="Checkout" onClick={checkout}>CHECKOUT</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    cartAmount: state.cartAmount,
    authentication: state.authentication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartProduct: (carturl, item_id) =>
      dispatch(removeCartProduct(carturl, item_id)),
    generateTransactionNumber: () => dispatch(generateTransactionNumber()),
    createOrder: (order) => dispatch(createOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
