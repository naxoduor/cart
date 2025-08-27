import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import { signupUser } from '../action/requestActions'
import RegisterForm from '../components/forms/registerform'
import './auth.css';

function SignUp(props) {

    const [state,setState]=useState({
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        mobile:''
    })


    const handleChange = ((e) => {
        setState({...state,
            [e.target.id]: e.target.value
        })
    })

    const handleSubmit = ((e) => {
        let username = `${state.firstName} ${state.lastName}`
        e.preventDefault();
        props.signupUser(username, state.email, state.password, state.mobile)
        props.handleClose()
        props.displaySignIn()
    })

        const showHideClassName = props.show ? "signinmodal display-block" : "signinmodal display-none";
        return (
                <div className={`${showHideClassName} signinmodal-main`}>
                    <span className="close" onClick={props.handleClose}>&times;</span>
                    <RegisterForm handleSubmit={handleSubmit} handleChange={handleChange} />
                </div>
        )
    
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (username, email, password, mobile) => dispatch(signupUser(username, email, password, mobile)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)