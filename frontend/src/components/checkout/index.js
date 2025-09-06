import React, { useState } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../action/requestActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom'
import { createAddress } from "../../action/requestActions";

function Checkout(props) {

  const [formData, setFormData] = useState({
    inputName: '',
    inputPhone: '',
    inputAddress: '',
    inputEmail: ''
  })

  
  const navigate = useNavigate();

  const createAddress = (e) => {
    e.preventDefault();
    props.createAddress(formData.inputName, formData.inputPhone, formData.inputAddress, formData.inputEmail);
    navigate('/')
  }

  const handleChange = ((e) => {
    const {id, value} = e.target;
    setFormData((prev) => ({
      ...prev, [id]: value
    }));
  });


  return (
    <div className="row">
      <div class="col-md-5">
          <div class="mb-3">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" value={formData.inputName} class="form-control" id="inputName" onChange={handleChange}/>
          </div>
          <div class="mb-3">
            <label for="inputPhone" class="form-label">Phone Number</label>
            <input type="text" value={formData.inputPhone} class="form-control" id="inputPhone" onChange={handleChange}/>
          </div>
      </div>

      <div class="col-md-5">
          <div class="mb-3">
            <label for="inputAddress" class="form-label">Email address</label>
            <input type="text" value={formData.inputAddress} class="form-control" id="inputAddress" onChange={handleChange}/>
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input type="email" value={formData.inputEmail} class="form-control" id="inputEmail" onChange={handleChange}/>
          </div>
          <button type="submit" class="btn btn-primary" onClick={createAddress}>Submit</button>
      </div>
    </div>


    //   <div style={{width:"100%", textAlign:"center"}}>
    //     <form onSubmit={createAddress} className="white" style={{paddingTop:"20px"}}> 
    //     <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-around",
    //       width: "100%"
    //     }}
    //   >
    //     <div style={{width: "30%"}}>
    //       <Typography variant="h6" component="div">
    //         Name
    //       </Typography>

    //       <TextField
    //        style={{width: "100%"}}
    //         id="name"
    //         // value={name}
    //         label="Name"
    //         onChange={handleChange}
    //         variant="standard"
    //       />
    //       </div>
    //       <div style={{width: "30%"}}>
    //       <Typography variant="h6" component="div">
    //         Phone Number
    //       </Typography>

    //       <TextField
    //         style={{width: "100%"}}
    //         id="phone"
    //         value=''
    //         label="Phone Number"
    //         onChange={handleChange}
    //         variant="standard"
    //       />
    //       </div>
    //       <div style={{width: "30%"}}>
    //       <Typography variant="h6" component="div">
    //         Postal Address
    //       </Typography>

    //       <TextField
    //         style={{width: "100%"}}
    //         id="address"
    //         // value={address}
    //         label="Postal Address"
    //         onChange={handleChange}
    //         variant="standard"
    //       />
    //       <TextField
    //         style={{width: "100%"}}
    //         id="email"
    //         // value={email}
    //         label="Email"
    //         onChange={handleChange}
    //         variant="standard"
    //       />
    //       </div>
    //   </div>  
    //   <Button onClick={createAddress} variant="contained" type="submit"
    //    style={{ 
    //      marginTop: "20px",
    //      width: "30%",
    //      backgroundColor: "rgba(47, 22, 22, 1)",
    //    }} >Submit</Button>
    //    </form>
    // </div>
  );
}


const mapStateToProps = (state) => ({
  productItem: state.productItem,
  orderDetails: state.orderDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
    createAddress: (name, phone, address, email) => dispatch(createAddress(name, phone, address, email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
