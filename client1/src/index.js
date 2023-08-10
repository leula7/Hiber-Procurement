import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux' ;
import { setupListeners } from '@reduxjs/toolkit/query';
import { PersistGate } from "redux-persist/integration/react";
import store,{ persistor } from 'state/store';
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <App />
    </PersistGate>
  </Provider>
  <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
  </React.StrictMode>
);

