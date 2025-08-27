import React, { useState } from "react";
import { connect } from "react-redux";
import { addProduct} from "../../action/requestActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom'




function Checkout(props) {

  const[state, setState]=useState({
    name:'',
    phone:'',
    address:''
  })

  const navigate = useNavigate();

  const createAddress = () =>{    
    navigate('/')
  }



  const handleChange = (e) => {
    setState(prevState=>({
      ...prevState, [e.target.id]:e.target.value
    }))
    console.log(state)
  }
  
  return (
    <div style={{width:"100%", textAlign:"center"}}> 
      <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%"
      }}
    >
      <div style={{width: "30%"}}>
        <Typography variant="h6" component="div">
          Name
        </Typography>

        <TextField
         style={{width: "100%"}}
          id="name"
          label="Name"
          onChange={handleChange}
          variant="standard"
        />
        </div>
        <div style={{width: "30%"}}>
        <Typography variant="h6" component="div">
          Phone Number
        </Typography>

        <TextField
          style={{width: "100%"}}
          id="phone"
          label="Phone Number"
          onChange={handleChange}
          variant="standard"
        />
        </div>
        <div style={{width: "30%"}}>
        <Typography variant="h6" component="div">
          Postal Address
        </Typography>

        <TextField
          style={{width: "100%"}}
          id="address"
          label="Postal Address"
          onChange={handleChange}
          variant="standard"
        />
        </div>
    </div>  
    <Button 
     style={{ 
       marginTop: "20px",
       width: "30%",
       backgroundColor: "rgb(200, 100, 100)",
     }} onClick={createAddress}>Submit</Button>
  </div>
  );
}


const mapStateToProps = (state) => ({
  productItem: state.productItem,
  orderDetails:state.orderDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
