import axios from "axios";
import {
  FETCH_CATALOGUE_PRODUCTS,
  FETCH_CATALOGUE_PRODUCTS_AS_ADMIN,
  FETCH_DEPARTMENTS,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_BY_DEPARTMENT,
  FETCH_PRODUCTS_BY_DEPARTMENT,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_CART_ITEMS,
  FETCH_CART_AMOUNT,
  CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
  FETCH_DEPARTMENT_PAGE_PRODUCTS,
  FETCH_CATEGORY_PAGE_PRODUCTS,
  SIGNED_UP_LOCALLY,
  FETCH_CATEGORY_PAGINATION_PRODUCTS,
  FETCH_DEPARTMENT_PAGINATION_PRODUCTS,
  FETCH_SHIPPING_REGIONS,
  FETCH_SHIPPING_INFO,
  UPDATE_CATEGORYID,
  UPDATE_DEPARTMENTID,
  UPDATE_SHIPPING_ID,
  FETCH_SEARCH_PRODUCTS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_ATTRIBUTES,
  FETCH_ORDER_DETAILS,
  UPDATE_TRANSACTION_NUMBER,
  UPDATE_SHIPPING_COST,
  CUSTOMER_DETAILS,
  FETCH_CART_ITEMS_ERROR,
  FETCH_PRODUCT_ITEM,
  ADD_PRODUCT,
  UPDATE_ITEM_DETAILS,
  LIST_ORDERS,
  ORDER_DETAILS,
  FETCH_PAGE_PRODUCTS,
  CREATE_ADDRESS,
} from "./types";
import { BACKEND_URL } from "./urls";

export const fetchCatalogueProducts = (page) => (dispatch) => {
  let pageLink = `${BACKEND_URL}products/page-products`;
  let pageSize = 10;
  let params = { page, pageSize };
  axios
    .post(pageLink, { params })
    .then((res) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: [],
      })
    );
};

export const fetchCataloguePageProducts = (page) => (dispatch) => {
  let pageLink = `${BACKEND_URL}products/page-products`;
  let pageSize = 10;
  let params = { page, pageSize };
  axios
    .post(pageLink, { params })
    .then((res) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: [],
      })
    );
};

export const searchProductsByParam = (searchParam) => (dispatch) => {
  let searchLink = `${BACKEND_URL}products/search`;
  axios
    .post(searchLink, { searchParam })
    .then((res) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: [],
      })
    );
};

export const fetchCatalogueProductsAsAdmin = () => (dispatch) => {
  let productsurl = `${BACKEND_URL}products/productsAsAdmin`;
  axios
    .get(productsurl)
    .then((res) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS_AS_ADMIN,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS_AS_ADMIN,
        payload: [],
      })
    );
};


export const fetchDepartments = (departmentsurl) => (dispatch) => {
  let departmentsurl = `${BACKEND_URL}departments`;
  axios
    .get(departmentsurl)
    .then((res) =>
      dispatch({
        type: FETCH_DEPARTMENTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_DEPARTMENTS,
        payload: [],
      })
    );
};

export const fetchCategories = (categoriesurl) => (dispatch) => {
  let categoriesurl = `${BACKEND_URL}categories`;
  axios
    .get(categoriesurl)
    .then((res) =>
      dispatch({
        type: FETCH_CATEGORIES,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATEGORIES,
        payload: [],
      })
    );
};

export const fetchCategoriesByDepartment =async (id) => {

    return await axios.get(`${BACKEND_URL}categories/inDepartment/${id}`)

  };

export const fetchProductsByCategoryName = (name) => async (dispatch) =>{
  console.log("feeeetch category products by name", name)  
  // const data = await axios.get(`${BACKEND_URL}products/category/${name}`)
  // console.log(data)
 axios.get(`${BACKEND_URL}products/category/${name}`).then((res) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: [],
      })
    );
}

export const fetchProductsByDepartment =
  (departmentproductsurl, id) => (dispatch) => {
    let departmentproductsurl = `${BACKEND_URL}products/inDepartment/${id}`;
    let obj = {};
    obj.department_id = id;
    axios
      .get(departmentproductsurl)
      .then(
        (res) =>
          dispatch({
            type: FETCH_PRODUCTS_BY_DEPARTMENT,
            payload: res.data,
          }),
        dispatch({
          type: UPDATE_DEPARTMENTID,
          payload: obj,
        })
      )
      .catch((error) =>
        dispatch({
          type: FETCH_PRODUCTS_BY_DEPARTMENT,
          payload: [],
        })
      );
  };

export const fetchProductsByCategory = (productsurl, id) => (dispatch) => {
  let productsurl = `${BACKEND_URL}products/inCategory/${id}`;
  let obj = {};
  obj.category_id = id;
  axios
    .get(productsurl)
    .then(
      (res) =>
        dispatch({
          type: FETCH_PRODUCTS_BY_CATEGORY,
          payload: res.data,
        }),
      dispatch({
        type: UPDATE_CATEGORYID,
        payload: obj,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: [],
      })
    );
};

export const generateUniqueCartId = () => (dispatch) => {
  let carturl = `${BACKEND_URL}shoppingcart/generateUniqueId`;
  axios.get(carturl).then((res) => {
    localStorage.setItem("cartId", res.data);
  });
};

export const addToCart = (cartId, item, quantity) => (dispatch) => {
  let carturl = `${BACKEND_URL}shoppingcart/add`;
  const { product_id, color, size } = item;
  let attributes = `Color is ${color} and size is ${size}`;
  let params = { cartId, productId: product_id, attributes, quantity };
  axios
    .post(carturl, { params })
    .then((res) => {
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: res.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: [],
      })
    );
};

// export const updateProductDetails = (item, quantity) => dispatch => {
//     let carturl = '{BACKEND_URL}shoppingcart/add'
//     let params = {}
//     params.productId = item.product_id
//     params.attributes = `Color is ${item.color} and size is ${item.size}`
//     params.quantity = quantity
//     axios.post(carturl, { params })
//     .then(res =>{
//         dispatch({
//             type: FETCH_CART_ITEMS,
//             payload: res.data
//         })})
//         .catch(error=> dispatch({
//             type: FETCH_CART_ITEMS,
//             payload: []
//         }))
// }

export const updateCartItem = (item_id, quantity) => (dispatch) => {
  let cart_id = localStorage.getItem("cartId");
  let paramstr = "&";
  let joined_ids = `${item_id}${paramstr}${cart_id}`;
  let carturl = `${BACKEND_URL}shoppingcart/update/${joined_ids}`;
  let params = {};
  let itemList = [];
  params.quantity = quantity;
  axios
    .put(carturl, { params })
    .then((res) =>
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CART_ITEMS_ERROR,
        payload: itemList,
      })
    );
};

export const fetchCartItems = () => (dispatch) => {
  let cart_id = localStorage.getItem("cartId");
  let carturl = `${BACKEND_URL}shoppingcart/${cart_id}`;
  axios
    .get(carturl)
    .then((res) => {
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log("There was an error");
      dispatch({
        type: FETCH_CART_ITEMS_ERROR,
        payload: error.response,
      });
    });
};

export const fetchCartTotalAmount = (carturl, cart_id) => (dispatch) => {
  let carturl = `${BACKEND_URL}shoppingcart/totalamount/${cart_id}`;
  axios
    .get(carturl)
    .then((res) =>
      dispatch({
        type: FETCH_CART_AMOUNT,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CART_AMOUNT,
        payload: [],
      })
    );
};

export const fetchTotalDepartmentItems = (totalitemsurl, id) => (dispatch) => {
  let totalitemsurl = `${BACKEND_URL}departments/totalitems/${id}`;
  axios
    .get(totalitemsurl)
    .then((res) =>
      dispatch({
        type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
        payload: [],
      })
    );
};

export const fetchTotalCategoryItems = (totalitemsurl, id) => (dispatch) => {
  let totalitemsurl = `${BACKEND_URL}categories/totalitems/${id}`;

  axios
    .get(totalitemsurl)
    .then((res) =>
      dispatch({
        type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
        payload: [],
      })
    );
};

export const fetchDepartmentPageProducts = (finalurl, params) => (dispatch) => {
  axios
    .post(finalurl, { params })
    .then((res) =>
      dispatch({
        type: FETCH_DEPARTMENT_PAGE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_DEPARTMENT_PAGE_PRODUCTS,
        payload: [],
      })
    );
};

export const removeCartProduct = (item_id) => (dispatch) => {
  let itemList = [];
  let cart_id = localStorage.getItem("cartId");
  let paramstr = "&";
  let joined_ids = `${item_id}${paramstr}${cart_id}`;
  let carturl = `${BACKEND_URL}shoppingcart/removeProduct/${joined_ids}`;
  axios
    .delete(carturl)
    .then((res) =>
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CART_ITEMS_ERROR,
        payload: itemList,
      })
    );
};

export const fetchCategoryPageProducts = (finalurl, params) => (dispatch) => {
  axios
    .post(finalurl, { params })
    .then((res) =>
      dispatch({
        type: FETCH_CATEGORY_PAGE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CATEGORY_PAGE_PRODUCTS,
        payload: [],
      })
    );
};

export const signupUser = (username, email, password, mobile) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}customers`, { username, email, password, mobile })
    .then((res) =>
      dispatch({
        type: SIGNED_UP_LOCALLY,
      })
    );
};

export const signinUser = (email, password) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}customers/login`, { email, password })
    .then((res) => {
      localStorage.setItem("token", res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: true,
      });
    })
    .catch((err) => {
      dispatch({ type: "SIGNUP_ERROR", err });
    });
};

export const signOutUser = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}customers/logout`)
    .then((res) => {
      localStorage.setItem("token", null);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({ type: "SIGNUP_ERROR", err });
    });
};

export const fetchDepartmentPaginationProducts =
  (finalurl, id, params) => (dispatch) => {
    let finalurl = `${BACKEND_URL}products/inDepartment/pagination/${id}`;
    let obj = {};
    obj.department_id = params.department_id;
    axios
      .post(finalurl, { params })
      .then((res) =>
        dispatch({
          type: FETCH_DEPARTMENT_PAGINATION_PRODUCTS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: FETCH_DEPARTMENT_PAGINATION_PRODUCTS,
          payload: [],
        })
      );
  };

export const fetchAttributes = (product_id) => (dispatch) => {
  let attributesurl = `${BACKEND_URL}attributes/inAttribute/${product_id}`;
  axios
    .get(attributesurl)
    .then((res) =>
      dispatch({
        type: FETCH_ATTRIBUTES,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_ATTRIBUTES,
        payload: [],
      })
    );
};

export const fetchCategoryPaginationProducts =
  (finalurl, id, params) => (dispatch) => {
    let finalurl = `${BACKEND_URL}products/inCategory/pagination/${id}`;
    let obj = {};
    obj.category_id = params.category_id;
    axios
      .post(finalurl, { params })
      .then((res) =>
        dispatch({
          type: FETCH_CATEGORY_PAGINATION_PRODUCTS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: FETCH_CATEGORY_PAGINATION_PRODUCTS,
          payload: [],
        })
      );
  };

export const fetchShippingRegions = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}shipping/regions/`)
    .then((res) =>
      dispatch({
        type: FETCH_SHIPPING_REGIONS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_SHIPPING_REGIONS,
        payload: [],
      })
    );
};

export const fetchShippingInformation = (shipping_id) => (dispatch) => {
  let shipping = {};
  let shippinginfourl = `${BACKEND_URL}shipping/regions/regionId/${shipping_id}`;
  axios
    .get(shippinginfourl)
    .then((res) =>
      dispatch({
        type: FETCH_SHIPPING_INFO,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_SHIPPING_INFO,
        payload: [],
      })
    );
};

export const updateShippingId = (shipping_id) => (dispatch) => {
  let obj = {};
  obj.shippingId = shipping_id;
  dispatch({
    type: UPDATE_SHIPPING_ID,
    payload: obj,
  });
};

export const updateShippingCost = (shipping_cost) => (dispatch) => {
  dispatch({
    type: UPDATE_SHIPPING_COST,
    payload: shipping_cost,
  });
};

export const createOrder = (order) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}orders`, { order })
    .then((res) => {
      localStorage.setItem("orderId", res.data.order_id);
      localStorage.setItem("cartId", null);
      dispatch({
        type: ORDER_DETAILS,
        payload: res.data,
      });
    })
    .then(() =>
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: [],
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const listOrders = () => (dispatch) => {
  axios
    .get(`${BACKEND_URL}orders`)
    .then((res) =>
      dispatch({
        type: LIST_ORDERS,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const fetchOrderDetails = (id) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}orderdetails/${id}`)
    .then((res) =>
      dispatch({
        type: ORDER_DETAILS,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateProductItem = (item) => (dispatch) => {
  dispatch({
    type: FETCH_PRODUCT_ITEM,
    payload: item,
  });
};

export const addProduct = (product) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}addproduct`, { product })
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: product,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateProductDetails = (product) => (dispatch) => {
  axios
    .put(`${BACKEND_URL}products/updateproduct`, { product })
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const authorizeCheckout = (token) => (dispatch) => {
  axios
    .get(`${BACKEND_URL}protected`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: CUSTOMER_DETAILS,
        payload: res.data,
      });
    })
    .then(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: true,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: false,
      });
    });
};

export const findOrderDetails = (dates) => (dispatch) => {
  axios
    .post(`${BACKEND_URL}orderdetails`, { dates })
    .then((res) =>
      dispatch({
        type: FETCH_ORDER_DETAILS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_ORDER_DETAILS,
        payload: [],
      })
    );
};

export const updateItemDetails = (product) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_DETAILS,
    payload: product,
  });
};

export const generateTransactionNumber = () => (dispatch) => {
  let transactionNumber = "";
  let possible = "ABCDEFGHIJKLMNopqrstuvwxyz123456";
  for (let i = 0; i < 5; i++)
    transactionNumber += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );

  dispatch({
    type: UPDATE_TRANSACTION_NUMBER,
    payload: transactionNumber,
  });
};


export const createAddress = (name, phone, address, email) => (dispatch) => {
  let order_id = localStorage.getItem("orderId");
  axios
    .post(`${BACKEND_URL}address/createAddress`, { name, phone, address, email, order_id })
    .then((res) =>
      dispatch({
        type: CREATE_ADDRESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
}

// export const passwordReset = (email) => dispatch => {
//     let transport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'naxoduor7@gmail.com',
//             pass: 'Maradonabingwa86'
//         }
//     });

//     axios.post('{BACKEND_URL}customers/passwordreset', { email })
//         .then(res => res.data)
//         .then(token => {
//             const message = {
//                 from: 'naxoduor7@gmail.com',
//                 to: 'naxochieng86@gmail.com',
//                 subject: 'Design Your Model S | Tesla',
//                 html: '<h1>Have the most fun you can in a car!</h1><p>Get your Tesla</p>'
//             }
//             transport.sendMail(message, function(err,info){

//             })
//         })
//         .catch(err => {

//         })
// }
