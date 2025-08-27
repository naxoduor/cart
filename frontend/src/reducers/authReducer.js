const initState = {
    authError: null,
    authenticated:false
}
const authReducer = (state=initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
        return{
            ...state, 
            authError:'login failed',
            authenticated:false
        }

        case 'LOGIN_SUCCESS':
       return {
           ...state, 
           authError: null,
           authenticated:true
       }

       case 'SIGNOUT_SUCCESS':
       return state

       case 'SIGNUP_SUCCESS':
       return{
           ...state, authError: null
       }

       case 'SIGNUP_ERROR':
       return {
           ...state,
        authError: action.err.message,
        authenticated:false
       }

       default:
        return state
    }
}

export default authReducer;