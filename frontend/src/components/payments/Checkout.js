import React, { Component, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
// import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'


function Checkout(props) {
    
   const onToken = (amount, description) => token => {
        getMoney(token)

    }

    const getMoney = (async (token)=>{

        let response = await fetch("http://localhost:9000/charge", {
            method: 'POST',
            headers: { 'Content-type': 'text/plain' },
            body: token.id
        });
        //this.props.removeAllProductsFromCart();
        this.props.history.push("/");
        if (response.ok) {
            console.log("Purchase Completed")
        }

    })

        let description = "Awesome Amount"

        let amount = "";
        this.props.cartAmount.items.map(amt => {
            if (amt.total_amount) {
                amount = amt.total_amount
            }
        })

        let totalamt = parseInt(amount)

        return (
            <StripeCheckout
                amount={totalamt}
                billingAddress
                description={description}
                locale="auto"
                token={()=>onToken(amount, description)}
                stripeKey="pk_test_74JXRfxXWD6utRVyr7DRUFqT"
                zipCode />
        )
    
}

const mapStateToProps = state => ({
    cartAmount: state.cartAmount
})
// export default withRouter(connect(mapStateToProps, null)(Checkout))
export default Checkout 