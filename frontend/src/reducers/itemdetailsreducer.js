import { UPDATE_ITEM_DETAILS} from '../action/types'

const initialState = {
    items: [],
    item: {}
}

const itemDetailsReducer = (state = initialState, action) =>{

    switch(action.type) {
        case UPDATE_ITEM_DETAILS: 
        return {
            ...state,
                item: action.payload
            }

        default: return state
        }
    }

export default itemDetailsReducer