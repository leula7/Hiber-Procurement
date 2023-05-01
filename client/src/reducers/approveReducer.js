const approveReducer = (state = {authData: null},action)=>{
        switch(action.type){
            case "Auth_Start":
                return {...state}
            case "Auth_Success":
                localStorage.setItem("approval",JSON.stringify(action.data))
                return {...state,authData: action.data}
            case "Auth_Failed":
                return {...state}
            default:
                return state;
        }
}
export default approveReducer;