import { ORDER_DETAILS } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
    
            case ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            }
        default: return state;
    }

}

export default orderDetailsReducer