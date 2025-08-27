import React from 'react'
import './submitlabelButtons.css'
export default function labelInput(props) {

    return (
        <div>
            <div className='inputGroup'>
                <label className='loginRegisterLabel' htmlFor={props.htmlFor}>{props.name}</label>
                <input className='loginRegisterInput' type={props.type} id={props.id} placeholder={props.placeholder} onChange={props.handleChange}></input>
            </div>
        </div>
    )
}