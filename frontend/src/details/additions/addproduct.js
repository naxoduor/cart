import React, { useState} from 'react';
import { connect } from 'react-redux'
import {addProduct} from '../../action/requestActions'
function AddProduct(props) {
    const {productItem:{productItem}} = props

    const {quantity, name, description, price,
         discounted_price, delivery_cost, image, image2, thumbnail, display}  = productItem
    
    const [state, setState] = useState({
        quantity,name,description,price,discounted_price,delivery_cost,image,image2,thumbnail,display
    })

    const handleChange=((evt)=>{
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]:value
        });

    })

    const addProductItem=((event)=>{
        event.preventDefault()
        const {name, description, price, discounted_price, delivery_cost, image, image2, thumbnail, display} = state
        const product = {name,description,price,discounted_price,delivery_cost,image,image2,thumbnail,display}
        props.addProduct(product)
    })

    
    return ( 
        <div className='rightFrame'>
            <form onSubmit={addProductItem}>
            <div className='details'>
            <div>
            <h5>Name:</h5>
            <input name="name" type="text" value={state.name} onChange={handleChange} />
            </div>
            <div>
            <h5>Quantity:</h5>
            <input name="quantity" type="text" value={state.quantity} onChange={handleChange} />
            </div>
            <div>
            <h5>Price:</h5>
            <input name="price" type="text" value={state.price} onChange={handleChange} />
            </div>
            <div>
            <h5>Discounted Price:</h5>
            <input name="discounted_price" type="text" value={state.discounted_price} onChange={handleChange} />
            </div>
            <div>
            <h5>Delivery Cost:</h5>
            <input name="delivery_cost" type="text" value={state.delivery_cost} onChange={handleChange} />
            </div>
            <div>
            <h5>Image:</h5>
            <input name="image" type="text" value={state.image} onChange={handleChange} />
            </div>
            <div>
            <h5>Image2:</h5>
            <input name="image2" type="text" value={state.image2} onChange={handleChange} />
            </div>
            <div>
            <h5>Thumbnail:</h5>
            <input name="thumbnail" type="text" value={state.thumbnail} onChange={handleChange} />
            </div>
            <div>
            <h5>Display</h5>
            <input name="display" type="text" value={state.display} onChange={handleChange} />
            </div>
            <div>
            <h5>Description</h5>
            <textarea name="description" className='descriptionInput' value={state.description} onChange={handleChange} rows="14" wrap="soft"/>
            </div>
            </div>
            </form>
            <button className='rightCartButton' onClick={addProductItem}><h2>Add to Cart</h2></button>
        </div>
           )
}

const mapStateToProps = state => ({
    productItem: state.productItem,
})


const mapDispatchToProps = (dispatch) => {
    return {
        addProduct:(product)=>dispatch(addProduct(product))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)