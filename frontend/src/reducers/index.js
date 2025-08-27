import { combineReducers } from 'redux'
import productsReducer from './productsreducer'

import cartAmountReducer from './cartamountreducer'
import cartItemsReducer from './cartitemsreducer'
import customerReducer from './customerreducer'
import authenticationReducer from './authenticationReducer';
import totalItemsReducer from './totalitemsreducer'
//import signingReducer from './signinandupreducer'
import customerIdReducer from './customeridreducer'
import signInAndUpReducer from './signinandupreducer';
import shippingRegionsReducer from './shippingregionsreducer'
import shippingInfoReducer from './shippinginforeducer'
import idsReducer from './categoriesdepartmentidreducer'
import shippingIdReducer from  './shippingidreducer'
import attributesReducer from './attributesreducer'
// import authenticationReducer from './authenticationReducer'
import transactonReducer from './transactionreducer'
import shippingcostReducer from './shippingcostreducer'
import orderdetailsReducer from './orderdetailsreducer'
import productItemReducer from './productitemreducer'
import itemDetailsReducer from './itemdetailsreducer'
import orderReducer from './ordersreducer'

export default combineReducers({
    products: productsReducer,
    authentication: authenticationReducer,
    //departments: departmentsReducer,
    //categories: categoriesReducer,
    cartAmount: cartAmountReducer,
    cartItems: cartItemsReducer,
    totalItems: totalItemsReducer,
    signing:  signInAndUpReducer,
    customer: customerReducer,
    customerId: customerIdReducer,
    shippingRegions: shippingRegionsReducer,
    shippingInfo: shippingInfoReducer,
    selectedId: idsReducer,
    shippingId: shippingIdReducer,
    attributes: attributesReducer,
    auth: authenticationReducer,
    trxNumber: transactonReducer,
    shippingCost: shippingcostReducer,
    orderDetails: orderdetailsReducer,
    productItem: productItemReducer,
    itemDetails: itemDetailsReducer,
    orders: orderReducer,    
})