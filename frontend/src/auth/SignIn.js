import React, { Component, useState } from 'react';
import { signinUser } from '../action/requestActions'
import { connect } from 'react-redux'
import './auth.css';
import SignInForm from '../components/forms/signinform'
import{authorizeCheckout} from '../action/requestActions'

function SignIn(props) {

    const [state,setState]=useState({
        email:'',
        password:''
    })

    const handleChange = ((e) => {
        setState({...state,
            [e.target.id]: e.target.value
        })
    })

    const forgotPassword = (() => {
        props.handleClose();
        props.handleCloseOpen();
    })

    const handleSubmit = ((e) => {
        e.preventDefault();
        props.signinUser(state.email, state.password)
        let token = localStorage.getItem("token")
        if(token)
        props.handleClose()
    })
    
        const showHideClassName = props.show ? "signinmodal display-block" : "signinmodal display-none";
        return (
                <div className={`${showHideClassName} signinmodal-main`}>
                    <span className="close" onClick={props.handleClose}>&times;</span>
                    <SignInForm handleSubmit={handleSubmit} forgotPassword={forgotPassword} handleChange={handleChange}/>
                </div>
        )
    
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signinUser: (email, password) => dispatch(signinUser(email, password)),
        authorizeCheckout: (token) => dispatch(authorizeCheckout(token))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)