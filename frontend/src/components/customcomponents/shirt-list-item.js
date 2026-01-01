import React from "react";
import "./shirt-list-item.css";
import { updateItemDetails } from "../../action/requestActions";
import { connect } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import GenericButton from "./GenericButton";
import { useNavigate } from "react-router-dom";

const navigateToProductDetails = (navigate, product) => {
    const product_name =
      "/" +
      "products" +
      "/" +
      product.name.replace(/ /g, "_") +
      "/" +
      product.product_id;
    navigate(product_name);
  };

function ShirtListItem(props) {
  const navigate = useNavigate();
  const { name, price } = props.product;

  let product = props.product || {};
  let img = product.image;
  let image = "";
  if (img.includes(".jpg")) {
    image = img;
  } else {
    image = img + ".webp";
  }

  return (
      <div className="card bg-white rounded h-auto m-auto" onClick={()=>navigateToProductDetails(navigate, product)}>
        <img src={`/energy/${image}`} className="card-fluid" alt="..." />
        <div className="card-body">
          <div className="card-title w-100 text-wrap text-break">${name}</div>
          <p className="card-text">{price}</p>
          <div className="">
            <a href="#">
              <button type="button" class="btn btn-primary">
                View Item Details
              </button>
            </a>
          </div>
        </div>
      </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateItemDetails: (product) => dispatch(updateItemDetails(product)),
  };
};

export default connect(null, mapDispatchToProps)(ShirtListItem);
