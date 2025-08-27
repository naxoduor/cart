import React from "react"
import './orderdetails.css'
import { connect } from "react-redux"

function OrderDetails(props){
    const {orderDetails: {orderDetails}} = props
    return(
        <div className="modal">
        <div className="modal-content">
        <div className="header_list">
        <h2>{orderDetails.customer && orderDetails.customer.name}</h2>
        <h2>{orderDetails.customer && orderDetails.customer.mob_phone}</h2>
        </div>
            {orderDetails.order_details && orderDetails.order_details.map((orderDetail)=> {
                return (
                    <div className="list">
                    <div className="list_item">{orderDetail.item_id}</div>
                    <div className="list_item">{orderDetail.product_name}</div>
                    <div className="list_item">{orderDetail.unit_cost}</div>
                    </div>
                )
            }   
            )}
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orderDetails:state.orderDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)