import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ShirtList from '../components/shirt-listing'
import { fetchCatalogueProducts,fetchCatalogueProductsAsAdmin } from '../action/requestActions'

function Home(props) {

    useEffect(()=> {
        if(props.customer.item.role=="ADMIN"){
            props.fetchCatalogueProductsAsAdmin()
        }
        else{ 
            props.fetchCatalogueProducts()
        }
    })  

    return (
     <div>
        <ShirtList toggleSignInModal={props.toggleSignInModal}/>
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
        customer:state.customer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchCatalogueProductsAsAdmin: () => dispatch(fetchCatalogueProductsAsAdmin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)