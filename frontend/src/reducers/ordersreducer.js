    import { LIST_ORDERS } from "../action/types";


    const initialState = {
        items: [],
        item:{}
    }

    const orderReducer = (state = initialState, action) =>{
        switch(action.type){
            case LIST_ORDERS: {
                return {
                    ...state, items:action.payload
                }
            }
            default: return state
        }
    }

    export default orderReducer