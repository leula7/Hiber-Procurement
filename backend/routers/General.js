import {Router} from 'express';
import {  ForgetPassword, TotalApprove, TotalBIdParticipants, TotalBranchApprovedRequests,
   TotalBranchPendingRequests, TotalBranchRequests, TotalPendings, TotalRequest,
    TotalRequests, TotalTask, UpdatePassword, branch, branchname, cats, items, oneitem } from '../controller/general.conntroller.js';
import verifyToken from '../verifyToken.js';

const router = Router();

  router.get('/branch',verifyToken,branch);

  router.post('/forgetpass',ForgetPassword);

  router.post('/updatepassword',UpdatePassword);

  router.get('/branchname/:user_id',branchname);
  
  router.get('/items',items);
  
  router.get('/items/:cat_id',oneitem);
  
  router.get('/cats',cats);

  //ASISTANT
  router.get('/totalrequest/:user_id',TotalRequest);
  router.get('/totalpendings/:user_id',TotalPendings);
  router.get('/totalapproves/:user_id',TotalApprove);

  //MARKET OFFICER
  router.get('/totaltask/:user_id',TotalTask);
  router.get('/bidparticipants/:bid_id',TotalBIdParticipants);
  router.get('/totalrequests',TotalRequests);

  //BRANCH REQUESTS
  router.get('/branchrequests/:branch_id',TotalBranchRequests);
  router.get('/branchapproverequests/:branch_id',TotalBranchApprovedRequests);
  router.get('/branchpendingrequests/:branch_id',TotalBranchPendingRequests);

  export default router;