import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const navigateToProductDetails = (navigate, product) => {
  const productName = `/products/${product.name.replace(/ /g, "_")}/${product.product_id}`;
  navigate(productName);
};

function ShirtListItem({ product }) {
  const navigate = useNavigate();
  const { name, price, image: rawImage } = product;

  const image = rawImage.includes(".jpg") ? rawImage : `${rawImage}.webp`;

  const handleClick = () => {
    navigateToProductDetails(navigate, product);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={`/energy/${image}`}
        alt={name}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClick}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ShirtListItem;
