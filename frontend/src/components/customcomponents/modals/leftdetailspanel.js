import React from "react";
import "./leftdetailspanel.css";
export default function cartleft(props) {
  let product = props.product;
  let image = "";
  if (product.image) {
    let img = props.product.image;
    if (img.includes(".jpg")) {
      image = img;
    } else {
      image = img + ".webp";
    }
  }

  return (
    <div className="left_panel">
      <img
        height={300}
        width={350}
        title={props.product.name}
        src={`/energy/${image}`}
        alt="product"
      />
      <img
        height={50}
        width={80}
        title={props.product.name}
        src={`/energy/${image}`}
        alt="product"
      />
    </div>
  );
}
