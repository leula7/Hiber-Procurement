import {Router} from 'express';
import { pendingRequest,ApproveRequstes,RejectRequests } from '../controller/BranchManager.controller.js';

  const router = Router();

  router.get('/pending-requests/:branch_id',pendingRequest);
  
  router.put('/requests/:user_id/:requestId/approve',ApproveRequstes);
  
  router.put('/requests/:user_id/:requestId/reject',RejectRequests);

export default router;