import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../action/urls";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../action/requestActions";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Skeleton,
  Alert,
  Chip,
  Divider,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ItemDetails(props) {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const pathUrl = window.location.pathname;
                const url = BACKEND_URL + pathUrl.replace("/", "");
                const response = await axios.get(url);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error.message);
                setError("Failed to load product details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const incrementQuantity = () => {
        setQuantity(prev => Math.min(prev + 1, 99));
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(prev - 1, 1));
    };
    
    const handleAddToCart = () => {
        const cartId = localStorage.getItem("cartId");
        try {
            props.addToCart(cartId, product, quantity);
            navigate("/");
        } catch (error) {
            console.error("Failed to add to cart:", error.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const getImage = (prod) => {
        if (!prod.image) return "";
        return prod.image.includes(".jpg") ? prod.image : `${prod.image}.webp`;
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, boxShadow: 3 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={5}>
                            <Skeleton variant="rectangular" height={500} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <CardContent sx={{ p: 4 }}>
                                <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
                                <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                                <Skeleton variant="text" height={20} width="60%" sx={{ mb: 4 }} />
                                <Skeleton variant="rectangular" height={56} sx={{ mb: 4 }} />
                                <Skeleton variant="rectangular" height={48} width={200} />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button variant="outlined" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button */}
            <Box sx={{ mb: 3 }}>
                <IconButton
                    onClick={handleGoBack}
                    sx={{
                        color: "primary.main",
                        "&:hover": {
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                        },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <Card
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    boxShadow: 3,
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                <Grid container spacing={0}>
                    <Grid item xs={12} md={5}>
                        <CardMedia
                            component="img"
                            sx={{
                                height: { xs: 300, md: 500 },
                                objectFit: "cover",
                                width: "100%",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                            image={`/energy/${getImage(product)}`}
                            alt={product.name || "Product"}
                        />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <CardContent sx={{ p: 4, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="h3"
                                    component="h1"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        color: "primary.main",
                                        fontSize: { xs: "2rem", md: "2.5rem" },
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                {product.price && (
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 600,
                                            color: "success.main",
                                            mb: 2,
                                        }}
                                    >
                                        ${product.price}
                                    </Typography>
                                )}
                                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                    <Chip
                                        label="In Stock"
                                        color="success"
                                        variant="outlined"
                                    />
                                    {product.category && (
                                        <Chip
                                            label={product.category}
                                            variant="filled"
                                            sx={{ backgroundColor: "primary.light" }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    lineHeight: 1.7,
                                    color: "text.secondary",
                                    fontSize: "1.1rem",
                                }}
                            >
                                {product.description}
                            </Typography>

                            <Box sx={{ mt: "auto" }}>
                                {/* Quantity Selector */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Quantity
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <IconButton
                                            onClick={decrementQuantity}
                                            disabled={quantity <= 1}
                                            sx={{
                                                border: 1,
                                                borderColor: "divider",
                                                "&:hover": {
                                                    backgroundColor: "primary.light",
                                                },
                                            }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                minWidth: 40,
                                                textAlign: "center",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={incrementQuantity}
                                            disabled={quantity >= 99}
                                            sx={{
                                                border: 1,
                                                borderColor: "divider",
                                                "&:hover": {
                                                    backgroundColor: "primary.light",
                                                },
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    onClick={handleAddToCart}
                                    sx={{
                                        py: 1.5,
                                        fontSize: "1.2rem",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        boxShadow: 2,
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: 4,
                                        },
                                        "&:active": {
                                            transform: "translateY(0)",
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartId, product, quantity) =>
    dispatch(addToCart(cartId, product, quantity)),
});

export default connect(null, mapDispatchToProps)(ItemDetails);

