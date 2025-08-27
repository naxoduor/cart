import React, { useState} from 'react';
import { connect } from 'react-redux'
import {updateProductDetails} from '../../action/requestActions'
import './update.css'

function UpdateProduct(props) {
        const {productItem:{productItem}} = props

        const {product_id, quantity, name, description, price, 
            discounted_price, delivery_cost, image, thumbnail, display}=productItem

    
        const [state, setState] = useState({
        product_id,quantity,name,description,price,discounted_price,delivery_cost,
        image,image2:productItem.image_2,thumbnail,display
    })

    const handleChange=((evt)=>{
        const value = evt.target.value;
        setState({
            ...state,   
            [evt.target.name]:value
        });

    })

    const updateProductDetails=((event)=>{  
        event.preventDefault()
        const {product_id, name, description, price, discounted_price, 
            delivery_cost, image, image2, thumbnail, display}=state

        const product = {
            product_id,name,description,price,discounted_price,delivery_cost,image,image2,thumbnail,display
        }
        props.updateProductDetails(product)
    })

    
    return ( 
        <div className='rightFrame'>
            <div className='details'>
            <form onSubmit={updateProductDetails}>
            <div className='details'>
            <div>
            <h5>Name:</h5>
            <input name="name" className="inputItem" type="text" value={state.name} onChange={handleChange} />
            </div>
            <div>
            <h5>Quantity:</h5>
            <input name="quantity" className="inputItem" type="text" value={state.quantity} onChange={handleChange} />
            </div>
            <div>
            <h5>Price:</h5>
            <input name="price" className="inputItem" type="text" value={state.price} onChange={handleChange} />
            </div>
            <div>
            <h5>Discounted Price:</h5>
            <input name="discounted_price" className="inputItem" type="text" value={state.discounted_price} onChange={handleChange} />
            </div>
            <div>
            <h5>Delivery Cost:</h5>
            <input name="delivery_cost" className="inputItem" type="text" value={state.delivery_cost} onChange={handleChange} />
            </div>
            <div>
            <h5>Image:</h5>
            <input name="image" className="inputItem" type="text" value={state.image} onChange={handleChange} />
            </div>
            <div>
            <h5>Image2:</h5>
            <input name="image2" className="inputItem" type="text" value={state.image2} onChange={handleChange} />
            </div>
            <div>
            <h5>Thumbnail:</h5>
            <input name="thumbnail"  className="inputItem" type="text" value={state.thumbnail} onChange={handleChange} />
            </div>
            <div>
            <h5>Display</h5>
            <input name="display" className="inputItem" type="text" value={state.display} onChange={handleChange} />
            </div>
            <div>
            <h5>Description</h5>
            <textarea name="description" className='descriptionInput' value={state.description} onChange={handleChange} rows="14" wrap="soft"/>
            </div>
            </div>
            </form>
            </div>
            <button className='rightCartButton' onClick={(e) => updateProductDetails(e, props.product)}><h2>Update To Cart</h2></button>
        </div>
           )
}

const mapStateToProps = state => ({
    productItem: state.productItem,
})


const mapDispatchToProps = (dispatch) => {
    return {
        updateProductDetails:(product)=>dispatch(updateProductDetails(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)