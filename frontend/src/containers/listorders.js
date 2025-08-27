import React, {useEffect,useState} from "react"
import { connect } from "react-redux"
import {listOrders, fetchOrderDetails} from "../action/requestActions"
// import OrderDetails from "../components/modals/orderdetails"
import './listorders.css'

function ListOrders(props){

    const [show, setShow] = useState(false)
    let orderDetails;

    const showOrderDetails = (e, id) =>{
        e.preventDefault()
        setShow(!show)
        props.fetchOrderDetails(id)
    }

    if(show){
        // orderDetails = <OrderDetails/>
    }


    useEffect(()=>{
        props.listOrders()
    },[])


    return(
        <div className="mm">
            <h1>Orders New List</h1>
            <div className="main_list">
            {props.orders.items.map((order)=>{
                return (
                    <div className="list">
                    <div className="list_item">{order&&order.customer&&order.customer.name?order.customer.name:"No Name"}</div>
                    <div className="list_item">{order.order_id}</div>
                    <div className="list_item">{order.total_amount}</div>
                    <div className="list_item"><button onClick={(e)=>showOrderDetails(e, order.order_id)}>View Order Details</button></div>
                    </div>
                )
            })}
            </div>
            {/* {orderDetails} */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders:state.orders
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        listOrders: () => dispatch(listOrders()),
        fetchOrderDetails: (id) =>dispatch(fetchOrderDetails(id))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ListOrders)