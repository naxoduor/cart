import React from "react";
import { connect } from "react-redux";
import ElectricalProductsListItem from "../customcomponents/electrical_products_list_item";
import { Pagination, Stack, Container, Box, Typography, Divider, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { fetchCataloguePageProducts } from "../../action/requestActions";

function ElectricalProductsList({ products: { products = [] } = {}, fetchCataloguePageProducts }) {
  const onPageChange = (event, page) => {
    fetchCataloguePageProducts(page);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 4,
          p: 6,
          color: "white",
          boxShadow: "0 20px 40px rgba(102, 126, 234, 0.15)",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
            textShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          Premium Electrical Products Collection
        </Typography>
        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            maxWidth: 600,
            mx: "auto",
            fontWeight: 400,
            lineHeight: 1.6
          }}
        >
          Discover our curated selection of high-quality electrical products. From casual use to professional applications,
          find your perfect fit with our premium collection.
        </Typography>
      </Box>

      <Divider sx={{ mb: 6, borderColor: "divider" }} />

      {products.length === 0 ? (
        <Paper
          sx={{
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            p: 6,
            textAlign: "center",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: 80,
              color: "text.secondary",
              mb: 3,
              opacity: 0.6
            }}
          />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
            No electrical products found
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 400, lineHeight: 1.6 }}>
            We couldn't find any products matching your criteria. Try adjusting your search filters
            or browse our entire collection for the latest arrivals.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)"
            },
            gap: 4,
            mb: 8,
          }}
        >
          {products.map((product, index) => (
            <Box
              key={product.id || product.product_id}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(30px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <ElectricalProductsListItem product={product} />
            </Box>
          ))}
        </Box>
      )}

      {products.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 8,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Pagination
            count={49}
            variant="outlined"
            shape="rounded"
            onChange={onPageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                margin: "0 8px",
                borderRadius: 2,
                fontWeight: 600,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCataloguePageProducts: (page) =>
    dispatch(fetchCataloguePageProducts(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ElectricalProductsList);


