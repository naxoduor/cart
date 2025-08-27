import React from "react";
import "./submitlabelButtons.css";
import Button from "@mui/material/Button";
export default function submitButtons(props) {
  return (
    <div>
      {/* <button className="loginRegisterBtn">{props.text}</button> */}
      <Button
        className="loginRegisterBtn"
        style={{
          width: "90%",
          marginTop: "10px",
          backgroundColor: "rgb(200, 100, 100)",
          borderRadius: "10px",
        }}
      >
        {props.text}
      </Button>
    </div>
  );
}
