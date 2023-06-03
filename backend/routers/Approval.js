import {Router} from 'express';
import { ApproveProposal, proposal, proposaldetail } from '../controller/Approval.controller.js';


const router = Router();

  router.get('/proposal',proposal);

  router.get('/proposaldetail',proposaldetail);
  
  router.put("/approveproposal/:prop_id/:checked_by/:status",ApproveProposal)

  export default router;