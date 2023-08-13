//import { Form } from "react-router-dom";
import {legacy_createStore as createStore,applyMiddleware} from "redux";
import {reducers} from "../reducers";
import thunk from "redux-thunk";

function saveToLocalStorage(store){
    try {
        const serial = JSON.stringify(store);
        window.localStorage.setItem('store',serial);
    } catch (error) {
        console.log("Redux Store: ",error);
    }
}

function loadFormLocalStorage(){
    try {
        const serial = window.localStorage.getItem('store');
        if(serial === null) return undefined;
        return JSON.parse(serial);
    } catch (error) {
        console.log("load Redux Store: ",error);
        return undefined;
    }
}

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__|| compose;
const persistedState = loadFormLocalStorage();

const store = createStore(reducers,persistedState,applyMiddleware(thunk));
store.subscribe(()=> saveToLocalStorage(store.getState()));
export default store;