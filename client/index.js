import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./style.scss";
import {Provider} from "react-redux"
import 'bootstrap/dist/css/bootstrap.css';
import store from './store/ReduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
       <App />
    </Provider>
  </React.StrictMode>,

);


