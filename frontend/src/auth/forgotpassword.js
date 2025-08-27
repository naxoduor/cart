import React, { Component, useState } from 'react';
import axios from 'axios';
import './auth.css';
import ForgotPasswordForm from '../components/forms/forgotpasswordform'
import ErrorForms from './errorforms'

const title = 'Forgot Password Screen'


function ForgotPassword(props) {

    const [email, setEmail]=useState('')
    const [showError, setShowError]=useState('')
    const [messageFromServer, setMessageFromServer]=useState('')
    const [showNullError, setShowNullError]=useState('')


    const handleChange = ((e) => {
        setEmail(e.target.value)
        // setState({
        //     [e.target.id]: e.target.value
        // })
    })

    const sendEmail =  ((e) => {
        e.preventDefault();
        if (email == '') {
            setShowError(false)
            setMessageFromServer('')
            setShowNullError(true)
        } else {
            try {
                const response = axios.post('http://localhost:8080/customers/forgotpassword', { email });
                if (response.data === 'recovery email sent') {
                    setShowError(false)
                    setMessageFromServer('recovery email sent')
                    setShowNullError(false)
                }
            } catch (error) {
                console.error(error.response.data);
                if (error.response.data === 'email not in db') {
                    setShowError(true)
                    setMessageFromServer('')
                    setShowNullError(false)
                }
            }
        }
    })

        const showHideClassName = props.showForgotPass ? "signinmodal display-block" : "signinmodal display-none";

        return (
            <div className={showHideClassName}>
                <div className="signinmodal-main">
                    <span className="close" onClick={props.handleClose}>&times;</span>
                    <h1 className='title'>{title}</h1>
                    <ForgotPasswordForm sendEmail={sendEmail} handleChange={handleChange} />
                    <ErrorForms showError={showError} showNullError={showNullError} messageFromServer={messageFromServer} email={email}/>
                </div>
            </div>
        );
}

export default ForgotPassword