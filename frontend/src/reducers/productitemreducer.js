import {FETCH_PRODUCT_ITEM, ADD_PRODUCT} from '../action/types'
const initialState = {
    productItem:{}
}

const productItemReducer = (state=initialState, action) =>{
    switch(action.type) {
        case FETCH_PRODUCT_ITEM: {
            return {
                ...state,
                productItem:action.payload
            }
        }
        
        case ADD_PRODUCT: {
            return {
                ...state,
                productItem:action.payload
            }
        }
        default: return state
    }
}

export default productItemReducer