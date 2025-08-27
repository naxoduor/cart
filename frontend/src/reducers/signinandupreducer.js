const initState = {
    logged: null
}
const signInAndUpReducer = (state=initState, action) => {
    switch(action.type){
        
        case 'LOGIN_ACHIEVED':
       return {
           ...state, 
           logged: true
       }

       case 'SIGNUP_ACHIEVED':
       return{
           ...state, logged: true
       }

       case 'SIGNEDUP_LOCALLY':
       return {
           ...state,
           logged: false
       }

       case 'SIGNOUT_SUCCESS':
       return{
           ...state, logged: false
       }

      
       default:
        return state
    }
}

export default signInAndUpReducer;