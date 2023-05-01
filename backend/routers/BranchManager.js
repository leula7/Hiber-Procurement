import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';

  const router = Router();

  router.get('/pending-requests/:branch_id', async (req, res) => {
    try {
      const branch_id = req.params.branch_id;
      const pendingRequestsQuery = `SELECT ra.req_id AS request_id, 
      b.branch_name, b.branch_id, u.user_id, i.item_name, i.item_id, 
      i.price, a.quantity, 'Additional' AS purpose, a.time_of_purchase,
      ra.req_app_id, ra.user_id AS approved_by_user_id, ra.req_status
      FROM request_approve ra 
      JOIN additional_request a ON a.add_id = ra.req_id 
      JOIN item i ON a.item_id = i.item_id 
      JOIN user u ON a.user_id = u.user_id 
      JOIN branch b ON u.branch_id = b.branch_id 
      WHERE ra.req_status = 'Pending' 
      AND b.branch_id = 1
        UNION
        SELECT ra.req_id AS request_id, 
        b.branch_name, b.branch_id, u.user_id, i.item_name, i.item_id, 
        i.price, a.quantity, 'Replacement' AS purpose, a.time_of_purchase,
        ra.req_app_id, ra.user_id AS approved_by_user_id, ra.req_status
        FROM request_approve ra 
        JOIN replacement a ON a.rep_id = ra.req_id 
        JOIN item i ON a.item_id = i.item_id 
        JOIN user u ON a.user_id = u.user_id 
        JOIN branch b ON u.branch_id = b.branch_id 
        WHERE ra.req_status = 'Pending' 
        AND b.branch_id = ?;`
          
      const result = await executeQuery(pendingRequestsQuery, [branch_id,branch_id]);
      res.status(200).send({
        pendingRequests: result
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: error
      });
    }
  });
  
  router.put('/requests/:user_id/:requestId/approve', async (req, res) => {
    try{
    const requestId = req.params.requestId;
    const man_id = req.params.user_id;
    const router = "Approve";
    const giveApprove = `update request_approve set user_id = ?,req_status ='${router}' where req_app_id = ?`;
    const result = await executeQuery(giveApprove,[man_id,requestId]);
    if(result.affectedRows>0){
    console.log(result)
      res.json({
        "error": "200",
        "message": "Approve Successfully"
      })
    }
  
    }catch(err){
      res.json(err);
    }
    // Perform the logic to approve the request with the given ID
  });
  
  router.put('/requests/:user_id/:requestId/reject', async (req, res) => {
    try{
          const requestId = req.params.requestId;
          const man_id = req.params.user_id;
  
          const router = "Reject";
          const giveApprove = `update request_approve set user_id = ?,req_status ='${router}' where req_app_id = ?`;
          const result = await executeQuery(giveApprove,[man_id,requestId]);
        if(result.affectedRows>0){
          res.json({
            "error": "200",
            "message": "Reject Successfully"
          })
      }
  
    }catch(err){
      res.json(err);
    }
  });

export default router;