import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const NotFound = () => (
  <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
    <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
      404
    </Typography>
    <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
      Page not found.
    </Typography>
    <Typography variant="body1" sx={{ mb: 4 }}>
      The page you are looking for does not exist. Return to the homepage to continue browsing.
    </Typography>
    <Box>
      <Button component={RouterLink} to="/" variant="contained" color="primary">
        Back to Home
      </Button>
    </Box>
  </Container>
);

export default NotFound;
