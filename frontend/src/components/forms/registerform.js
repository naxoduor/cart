import React from "react";
import LabelInput from "../../components/elements/labelInput";
import SubmitButtons from "../elements/submitButtons";
import Button  from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./registerloginform.css";

export default function registerForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit} className="white">
          <Typography gutterBottom variant="h4" component="div">
            Sign Up
          </Typography>
            <TextField
              className="loginRegisterInput"
              id="email"
              label="email"
              onChange={props.handleChange}
              variant="standard"
            />
            <TextField
              className="loginRegisterInput"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={props.handleChange}
              variant="standard"
            />
            <TextField
              className="loginRegisterInput"
              id="firstName"
              label="First Name"
              onChange={props.handleChange}
              variant="standard"
            />
            <TextField
              className="loginRegisterInput"
              id="lastName"
              label="Last Name"
              onChange={props.handleChange}
              variant="standard"
            />
            <TextField
              className="loginRegisterInput"
              id="mobile"
              label="Mobile Number"
              onChange={props.handleChange}
              variant="standard"
            />
            <Button 
            style={{
              marginTop: "5px",
              width: "90%",
              backgroundColor: "rgb(200, 100, 100)"
            }}
            className="loginRegisterBtn" onClick={props.handleSubmit}>Sign Up</Button>
            <div className="red-text center"></div>
      </form>
    </div>
  );
}
