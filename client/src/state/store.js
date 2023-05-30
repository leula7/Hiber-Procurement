import { configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,
  PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import {api} from "state/api"
import authReducer  from 'state/state';

const persistConfig = {
    key: "root",
    storage,
  };
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore ({
  reducer : {
    auth: persistedAuthReducer,
    [api.reducerPath] : api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },}).concat(api.middleware),
});

export const persistor = persistStore(store);
export default store;