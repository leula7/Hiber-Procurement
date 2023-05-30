import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';
import { approveRequest, requests, waitingReequest } from '../controller/Assistant.controller.js';

const router = Router();

  router.post('/request',requests);

  router.get('/approved-requests/:user_id',approveRequest);

  router.get('/waiting-requests/:user_id', waitingReequest);

export default router;