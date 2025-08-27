import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function GenericButton(props){
  const {message, bgcolor, color, book, width} = props
    return (
    <Button onClick={() => props.handleButtonClick(book)}
    className="addButton"
    style={{
      backgroundColor: bgcolor? bgcolor: "brown",
      padding: "10px",
      color: color,
      width: width? width: "35%",
      marginTop: "30px",
      borderRadius: "10px",
      border:"none",
      cursor: "pointer",
    }}
  >
    <Typography variant="h6">{message}</Typography>
  </Button>
    )
}

export default GenericButton