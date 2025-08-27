import React, { useEffect } from "react"
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {signOutUser} from '../action/requestActions'
import './Nav.css'

function Nav(props){
  const logoutUser = ((event)=>{
    event.preventDefault()
    props.signOutUser()
  })

    return (
    <div className="nav">
    {/* <header className="mainHeader">
        <div class="container">
            <h1>Electrical Shop</h1>
        </div>
    </header> */}
      <div className="main_nav">
        <ul>
          {!props.auth.authenticated && <li>
            <Link to='/' onClick={props.toggleSignUpModal}><h3>Sign Up</h3></Link>
          </li>}
          <li className="viewCartButton" onClick={props.displayCart}>
            <h3>View Cart</h3>
          </li>
          {!props.auth.authenticated && <li>
            <Link to='/' onClick={props.toggleSignInModal}><h3>Sign In</h3></Link>
          </li>}
          {props.auth.authenticated && <li>
            <Link to='/' onClick={logoutUser}><h3>Sign Out</h3></Link>
          </li>}

          {props.customer && props.customer.item && props.customer.item.role =='ADMIN' && <li>
            <Link to='/allorders' ><h3>View Orders</h3></Link>
          </li>}

          {props.customer && props.customer.item && props.customer.item.role =='ADMIN' && <li>
            <Link to='/addproduct' >Add Product</Link>
          </li>}

          {props.customer && props.customer.item && props.customer.item.role =='ADMIN' && <li>
            <Link to='/' >HOME</Link>
          </li>}

        </ul>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    auth:state.auth,
    customer:state.customer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)