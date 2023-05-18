import express from 'express';
import { getProducts,getCustomers,getTransactions } from '../controllers/client.controller.js';


const clientRoutes = express.Router();
      clientRoutes.get('/products',getProducts);
      clientRoutes.get('/customers',getCustomers);
      clientRoutes.get('/transactions',getTransactions);

export default clientRoutes;