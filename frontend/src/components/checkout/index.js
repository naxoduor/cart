import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../../action/requestActions";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

function Checkout({ createAddress }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: ""
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createAddress(formData.name, formData.phone, formData.address, formData.email);
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 8,
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.08)"
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Checkout
            </Typography>
            <Typography color="text.secondary" sx={{ mx: "auto", maxWidth: 360 }}>
              Confirm your order details and delivery information before submitting.
            </Typography>
          </Box>

          <TextField
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Jane Doe"
          />
          <TextField
            id="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            placeholder="(555) 123-4567"
          />
          <TextField
            id="address"
            label="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
            multiline
            minRows={2}
            placeholder="123 Main St, Apt 4B"
          />
          <TextField
            id="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            placeholder="jane@example.com"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ py: 1.75, fontWeight: 700 }}
          >
            Complete Order
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createAddress: (name, phone, address, email) =>
    dispatch(createAddress(name, phone, address, email))
});

export default connect(null, mapDispatchToProps)(Checkout);
