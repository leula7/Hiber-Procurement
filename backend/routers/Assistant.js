<<<<<<< HEAD
import {Router} from 'express';
import { approveRequest, requests, waitingReequest } from '../controller/Assistant.controller.js';

const router = Router();

  router.post('/request',requests);

  router.get('/requests/:user_id',approveRequest);
  
  router.get('/waiting-requests/:user_id', waitingReequest);

=======
import {Router} from 'express';
import { approveRequest, requests, waitingReequest } from '../controller/Assistant.controller.js';

const router = Router();

  router.post('/request',requests);

  router.get('/requests/:user_id',approveRequest);
  
  router.get('/waiting-requests/:user_id', waitingReequest);

>>>>>>> remove
export default router;