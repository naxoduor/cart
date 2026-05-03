import React, { useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import { connect } from 'react-redux'
import ElectricalProductsList from '../components/electrical_products_listing'
import { fetchCatalogueProducts,fetchCatalogueProductsAsAdmin } from '../action/requestActions'

function Home(props) {
    useSEO(
      "Shop Online",
      "Browse high-quality electrical and solar products with secure delivery and easy checkout.",
      {
        keywords: "electrical, solar, products, shopping, online store",
        ogTitle: "Shop Online | Quality Products",
        ogDescription: "Browse high-quality electrical and solar products with secure delivery and easy checkout.",
        ogType: "website",
        schema: {
          type: "WebPage",
          data: {
            name: "Online Shop",
            description: "Browse high-quality electrical and solar products with secure delivery and easy checkout.",
            url: window.location.href
          }
        }
      }
    );

    useEffect(()=> {
        if(props.customer.item.role=="ADMIN"){
            props.fetchCatalogueProductsAsAdmin()
        }
        else{ 
            props.fetchCatalogueProducts()
        }
    }, [props.customer.item.role, props.fetchCatalogueProducts, props.fetchCatalogueProductsAsAdmin])  

    return (
     <div>
        <ElectricalProductsList toggleSignInModal={props.toggleSignInModal}/>
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