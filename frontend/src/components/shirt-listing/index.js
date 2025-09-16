import React from "react";
import { connect } from "react-redux";
import ShirtListItem from "../customcomponents/shirt-list-item";
import { Pagination, Stack } from "@mui/material";

import {
  fetchCartTotalAmount,
  authorizeCheckout,
  updateItemDetails,
  fetchCataloguePageProducts,
} from "../../action/requestActions";
import "./index.css";

function ShirtList(props) {
  const {
    products: { products },
    selectedId: { selectedId },
    totalItems: { totalItems },
  } = props;

  const onPageChange = (event, page) => {
    props.fetchCataloguePageProducts(page);
  };

  const renderShirtProducts = products.map((product) => (
    <ShirtListItem product={product} />
  ));

  return (
    <div className="w-100">
      <div className="d-flex flex-column flex-md-row flex-wrap" >{renderShirtProducts}</div>
      <Stack
        spacing={2}
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          width: "100%",
          alignItems: "center"
        }}
      >
        <Pagination
          sx={{
            '& .MuiPaginationItem-root': {
              margin: '0 20px',
            },
          }}
          count={35}
          variant="outlined"
          shape="rounded"
          onChange={onPageChange}
        />
      </Stack>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
  totalItems: state.totalItems,
  selectedId: state.selectedId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartTotalAmount: (carturl, cart_id) =>
      dispatch(fetchCartTotalAmount(carturl, cart_id)),
    authorizeCheckout: (token) => dispatch(authorizeCheckout(token)),
    updateItemDetails: (product) => dispatch(updateItemDetails(product)),
    fetchCataloguePageProducts: (page) =>
      dispatch(fetchCataloguePageProducts(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShirtList);
