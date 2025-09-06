import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../action/urls";
import { connect } from "react-redux";
import "./modals/details-modal.css";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../action/requestActions";

function ItemDetails(props) {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState({});

    useEffect(() => {
        const path_url = window.location.pathname;
        const url = BACKEND_URL + path_url.replace("/", "");

        async function fetchData() {
            const response = await axios.get(url);
            setData(response.data);
        }
        fetchData();
    }, []);

    const handleQuantityClick = (event) => {
        event.preventDefault();
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        let cartId = localStorage.getItem("cartId");
        try {
            props.addToCart(cartId, data, quantity);
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

    const getImage = (product) => {
        let image = "";
        if (product.image) {
            let img = product.image;
            if (img.includes(".jpg")) {
                image = img;
            } else {
                image = img + ".webp";
            }
        }
        return image;
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <img
                        src={`/energy/${getImage(data)}`}
                        alt=""
                        class="img-fluid"
                    />
                </div>
                <div class="col-md-7">
                    <h1 class="mt-5">{data.name}</h1>
                    <p class="mt-4">{data.description} </p>
                    <label for="subject" class="form-label">
                        Quantiry
                    </label>
                    <select name="subject" id="subject" class="form-select">
                        <option value="pricing">1</option>
                        <option value="technical" selected>
                            1
                        </option>
                        <option value="other">3</option>
                    </select>
                    <button type="button" class="btn btn-primary mt-3" onClick={handleAddToCart}>
                        ADD TO CART!
                    </button>
                </div>
            </div>
            {/* <div className="d-flex flex-wrap justify-content-space-around w-60">
                <LeftCartFrame product={data} />
                <RightCartFrame product={data} />
            </div> */}
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cartId, product, quantity) => dispatch(addToCart(cartId, product, quantity)),
  };
};


export default connect(null, mapDispatchToProps)(ItemDetails);

// const { product } = props;
//   const { name, price, description } = product;
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const handleQuantityClick = (event) => {
//     event.preventDefault();
//     setQuantity(event.target.value);
//   };

//   const handleAddToCart = () => {
//     let cartId = localStorage.getItem("cartId");
//     let product = props.product;
//     try {
//       props.addToCart(cartId, product, quantity);
//     } catch (e) {
//       console.log(e);
//     }
//     // props.handleClose();
//   };

//   const updateProductDetails = () => {
//     let product = props.product;
//     props.updateProductItem(product);
//     navigate("/updateproduct");
//   };

//   return (
//     <div className="modalProductDetails">
//       <Typography gutterBottom variant="h4" component="div">
//         {name}
//       </Typography>
//       <Typography gutterBottom variant="h4" component="div">
//         KSHS {price}
//       </Typography>
//       <Typography
//         className="productDescription"
//         variant="body2"
//         color="text.secondary"
//       >
//         {description}
//       </Typography>
//       <Typography gutterBottom variant="h4" component="div">
//         Quantity
//       </Typography>

//       <TextField
//         id="outlined-basic"
//         label="Quantity"
//         className="quaInput"
//         type="number"
//         min={0}
//         max={10}
//         defaultValue={1}
//         step={1}
//         onClick={handleQuantityClick}
//         variant="outlined"
//       />
