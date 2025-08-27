import { CATEGORY_OR_PRODUCT_ITEMS_NUMBER } from '../action/types';

const initialState = {
    totalItems: [],
}
const totalItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_OR_PRODUCT_ITEMS_NUMBER:
            return {
                ...state,
                totalItems: action.payload
            }

            default: return state
    }
}

export default totalItemsReducer