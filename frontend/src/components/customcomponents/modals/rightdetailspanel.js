import "./rightdetailspanel.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addToCart, updateProductItem } from "../../../action/requestActions";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GenericButton from "../GenericButton";

function Cartright(props) {
  const { product } = props;
  const { name, price, description } = product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityClick = (event) => {
    event.preventDefault();
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    let cartId = localStorage.getItem("cartId");
    let product = props.product;
    try {
      props.addToCart(cartId, product, quantity);
    } catch (e) {
      console.log(e);
    }
    // props.handleClose();
  };

  const updateProductDetails = () => {
    let product = props.product;
    props.updateProductItem(product);
    navigate("/updateproduct");
  };

  return (
    <div className="modalProductDetails">
      <Typography gutterBottom variant="h4" component="div">
        {name}
      </Typography>
      <Typography gutterBottom variant="h4" component="div">
        KSHS {price}
      </Typography>
      <Typography
        className="productDescription"
        variant="body2"
        color="text.secondary"
      >
        {description}
      </Typography>
      <Typography gutterBottom variant="h4" component="div">
        Quantity
      </Typography>

      {/* <h1>{name}</h1>
      <h2>KSHS {price}</h2>
      <div className
      
      ="productDescription">{description}</div> */}

      {/* <label>
        <h2>Quantity</h2>
      </label> */}
      {/* <input className='quaInput' type="number" min={0} max={10} defaultValue={1} step={1} onClick={handleQuantityClick} /> */}
      <TextField
        id="outlined-basic"
        label="Quantity"
        className="quaInput"
        type="number"
        min={0}
        max={10}
        defaultValue={1}
        step={1}
        onClick={handleQuantityClick}
        variant="outlined"
      />
      <GenericButton
        className="rightCartButton"
        handleButtonClick={handleAddToCart}
        message="Add to Cart"
        bgcolor="rgb(200, 100, 100)"
        color="rgb(0, 0, 0)"
      />
      {props.customer && props.customer.item.role == "ADMIN" && (
        <GenericButton
          className="rightCartButton"
          handleButtonClick={updateProductDetails}
          message="Update Item"
          bgcolor="rgb(200, 100, 100)"
          color="rgb(0, 0, 0)"
        />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductItem: (product) => dispatch(updateProductItem(product)),
    addToCart: (cartId, product, quantity) =>
      dispatch(addToCart(cartId, product, quantity)),
  };
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cartright);
