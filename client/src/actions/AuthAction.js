import * as AuthApi from '../api/AuthRequest.js';


export const logIn = (formdata)=> async(dispatch)=>{

    dispatch({type: "Auth_Start"});
    try {
      const {data} = await AuthApi.logIn(formdata);
      dispatch({type: "Auth_Success", data: data});
    } catch (error) {
        console.log(error);
        dispatch({type: "Auth_Failed"});
    }
}

export const signUp = (formdata)=> async(dispatch)=>{
    dispatch({type: "Auth_Start"});
    try {
        const {data} = await AuthApi.logIn(formdata);
        dispatch({type: "Auth_Success", data: data});
    } catch (error) {
        console.log(error);
        dispatch({type: "Auth_Failed"});
    }
}
