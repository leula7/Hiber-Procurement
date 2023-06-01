import {Router} from 'express';
import { ApproveProposal, proposal } from '../controller/Approval.controller.js';


const router = Router();

  router.get('/proposal',proposal);
  
  router.put("/approveproposal/:prop_id/:checked_by/:status",ApproveProposal)

  export default router;