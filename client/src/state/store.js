import { configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import globalReducer from 'state/state';
import {api} from "state/api"
import authReducer  from 'state/authSlice';

const persistConfig = {
    key: "root",
    storage,
    // Add any other configuration options you need
  };
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore ({
  reducer : {
    global: globalReducer,
    auth: persistedAuthReducer,
    [api.reducerPath] : api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export const persistor = persistStore(store);
export default store;