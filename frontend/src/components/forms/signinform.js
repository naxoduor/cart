import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem } from "react-bootstrap";
import { NavLink as ReactLink } from "react-router-dom";
import "./registerloginform.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function SignInForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit} className="white">
        <Typography 
          gutterBottom variant="h4" component="div">
            Sign In
          </Typography>
        <div>
          <TextField
            className="loginRegisterInput"
            id="email"
            label="Email"
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
          <Button 
          style={{
            marginTop: "5px",
            width: "90%",
            backgroundColor: "rgb(200, 100, 100)"
          }}
          className="loginRegisterBtn" onClick={props.handleSubmit}>Login</Button>
          <div className="linkin">
            <Nav>
              <Nav.Link
                href="#"
                tag={ReactLink}
                to="/"
                onClick={props.forgotPassword}
              >
                Forgot Password
              </Nav.Link>
            </Nav>
          </div>
          <div className="red-text center"></div>
        </div>
      </form>
    </div>
  );
}
