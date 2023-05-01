import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';
import verifyToken from "../verifyToken.js";

const router = Router();

  router.post('/request',verifyToken,async (req, res,next) => {
    //get input from user
    try {
        
        const user_id = req.body.user_id;
        const table = req.body.type;
        const item_id = req.body.item_id;
        const quantity = req.body.quantity;
        const time_of_purchase = req.body.time_of_purchase;
        const title_of_post = req.body.title_of_post;
        const other_reason = req.body.other_reason;
        const bookvalue = req.body.bookvalue;
        const serviceyear = req.body.serviceyear;
        const frequency = req.body.frequency;
        const tagno = req.body.tagno;
        var id = "rep_id";
        var requestQuery;
        
        const requestParams = [
        table,
        user_id,
        item_id,
        quantity,
        time_of_purchase,
        title_of_post,
        other_reason,
        tagno,
        serviceyear,
        frequency,
        bookvalue
        ];

    if (table === 'replacement') {
    requestQuery = " INSERT INTO ?? VALUES ('', ?, ?, ?, ?, ?, ?, ?, ?, '')";
    id = "rep_id";
    } else if (table === 'additional_request') 
    {
    requestQuery = " INSERT INTO ?? VALUES ('', ?, ?, ?, ?, ?, ?,'')";
    id = "add_id";
    } else {
    throw new Error(`Invalid table type: ${table}`);
    }
    
    const result = await executeQuery(requestQuery, requestParams);

    res.status(200).send({
        message: `Successfully created ${table} request with ID ${result.insertId}`,
        request_id: result.insertId
    });
    } catch (error) {
    console.log("request Error: ",error);
    next(error);
    res.json({
        message: "Error occurred while creating the request"
    });
    }
  });

  router.get('/approved-requests/:user_id', async (req, res) => {
    try {
      const Assistant_id = req.params.user_id;
      const ApproveQuery = `SELECT ra.req_id AS request_id, 
      b.branch_name, b.branch_id, u.user_id, i.item_name, 
      i.item_id, i.price, a.quantity, 'Additional' AS purpose, a.time_of_purchase,
      ra.req_app_id, ra.user_id, ra.req_status
      FROM request_approve ra 
      JOIN additional_request a ON a.add_id = ra.req_id 
      JOIN item i ON a.item_id = i.item_id 
      JOIN user u ON a.user_id = u.user_id 
      JOIN branch b ON u.branch_id = b.branch_id 
      WHERE ra.req_status = 'Approve'
      AND u.user_id = ?
      
      union
      
      SELECT ra.req_id AS request_id, 
      b.branch_name, b.branch_id, u.user_id, i.item_name, 
      i.item_id, i.price, a.quantity, 'Replacement' AS purpose, a.time_of_purchase,
      ra.req_app_id, ra.user_id, ra.req_status
      FROM request_approve ra 
      JOIN replacement a ON a.rep_id = ra.req_id 
      JOIN item i ON a.item_id = i.item_id 
      JOIN user u ON a.user_id = u.user_id 
      JOIN branch b ON u.branch_id = b.branch_id 
      WHERE ra.req_status = 'Approve'
      AND u.user_id = ?`

      const result = await executeQuery(ApproveQuery, [Assistant_id,Assistant_id]);
      res.status(200).send({
        approved: result
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error occurred while fetching the pending requests"
      });
    }
  });

  router.get('/waiting-requests/:user_id', async (req, res) => {
    try {
      const Assistant_id = req.params.user_id;

      const ApproveQuery = `SELECT ra.req_id AS request_id, 
            b.branch_name, b.branch_id, u.user_id, i.item_name, 
            i.item_id, i.price, a.quantity, 'Additional' AS purpose, a.time_of_purchase,
            ra.req_app_id, ra.user_id, ra.req_status
            FROM request_approve ra 
            JOIN additional_request a ON a.add_id = ra.req_id 
            JOIN item i ON a.item_id = i.item_id 
            JOIN user u ON a.user_id = u.user_id 
            JOIN branch b ON u.branch_id = b.branch_id 
            WHERE ra.req_status = 'Pending'
            AND u.user_id = ?
            
            union
            
            SELECT ra.req_id AS request_id, 
            b.branch_name, b.branch_id, u.user_id, i.item_name, 
            i.item_id, i.price, a.quantity, 'Replacement' AS purpose, a.time_of_purchase,
            ra.req_app_id, ra.user_id, ra.req_status
            FROM request_approve ra 
            JOIN replacement a ON a.rep_id = ra.req_id 
            JOIN item i ON a.item_id = i.item_id 
            JOIN user u ON a.user_id = u.user_id 
            JOIN branch b ON u.branch_id = b.branch_id 
            WHERE ra.req_status = 'Pending'
            AND u.user_id = ?`
            

      const result = await executeQuery(ApproveQuery, [Assistant_id,Assistant_id]);
      res.status(200).send({
        approved: result
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: error
      });
    }
  });

export default router;