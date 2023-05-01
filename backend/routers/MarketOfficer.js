import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';

const router = Router();

  router.get("/generated-document",async(req,res)=>{
      const getDocumnet = `SELECT a.add_id as request_id, b.branch_name,b.branch_id, a.Assistant_id, i.item_name, i.item_id,i.price, a.quantity, 'Additional' as purpose, a.time_of_purchase,ra.req_app_id,ra.man_id, ra.req_status FROM request_approve ra
      JOIN additional_request a ON a.add_id = ra.req_id 
      JOIN item i ON a.item_id = i.item_id 
      JOIN assistant asst ON a.Assistant_id = asst.Assistant_id 
      JOIN branch b ON asst.branch_id = b.branch_id WHERE ra.req_status = 'Approve'
      UNION SELECT r.rep_id as request_id, b.branch_name,b.branch_id, r.Assistant_id, i.item_name, i.item_id,i.price, r.quantity, 'Replacement' as purpose, r.time_of_purchase,ra.req_app_id, ra.man_id, ra.req_status FROM request_approve ra
      JOIN replacement r ON r.rep_id = ra.req_id 
      JOIN item i ON r.item_id = i.item_id 
      JOIN assistant asst ON r.Assistant_id = asst.Assistant_id
      JOIN branch b ON asst.branch_id = b.branch_id WHERE ra.req_status = 'Approve' order by Branch_id`;
      try {
          const result =await executeQuery(getDocumnet,[]);
          res.json({result});
      } catch (error) {
        res.json({"message": error.message});
      }
    });

  router.get("/technical-documents",async(req,res)=>{
    const {supplier_id,position} = req.query;
  
    let files = "select * from files where supplier_id = ?";
    if(position === "supplier"){
       files = "select *from files where supplier_id = ?";
    }else{
       files = "select * from files";
    }
    const response =await executeQuery(files,supplier_id);
    res.json(
      {
        response
      }
    );
  });
  
  
  router.put("/setprice/:item_id/:price",async(req,res)=>{
    try {
      const {item_id,price} = req.params;
      const setprice = "update item set price=? where item_id = ?";
      const response = await executeQuery(setprice,[price,item_id]);
  
       if(response.affectedRows>0){
        res.json({"message": "Price Updated","row": response.affectedRows});
       }else{
        res.json({"row": response.affectedRows});
       }
    } catch (error) {
      console.log(error);
      res.json({
        "error": "200",
        "message": error.message
      })
    }
  });
  
  router.put("/update-catagory/:cat_id/:cata_Name",async(req,res)=>{
    try {
      const {cat_id,cata_Name} = req.params;
      const updateCatagory = "update catagory set cata_Name=? where cat_id = ?";
      const response = await executeQuery(updateCatagory,[cata_Name,cat_id]);
  
       if(response.affectedRows>0){
        res.json({"message": "Catagory Updated"});
       }
    } catch (error) {
      console.log(error);
      res.json({
        "error": "200",
        "message": error.message
      })
    }
  });
  
  router.put("/update-item/:item_id/:item_name",async(req,res)=>{
    try {
      const {item_id,item_name} = req.params;
      const updateItem = "update item set item_name=? where item_id = ?";
      const response = await executeQuery(updateItem,[item_name,item_id]);
  
       if(response.affectedRows>0){
        res.json({"message": "Item Updated"});
       }
    } catch (error) {
      console.log(error);
      res.json({
        "error": "200",
        "message": error.message
      })
    }
  });

  router.get("/technical-documents",async(req,res)=>{
    const {supplier_id,position} = req.query;
  
    let files = "select * from files where supplier_id = ?";
    if(position === "supplier"){
       files = "select *from files where supplier_id = ?";
    }else{
       files = "select * from files";
    }
    const response =await executeQuery(files,supplier_id);
    res.json(
      {
        response
      }
    );
  });
  
  router.get("/post", async (req, res) => {
    try {
      
      const posts = await new Promise((resolve, reject) => {
        const postQuery = "SELECT * FROM post";
  
        db.query(postQuery, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  
      const postWithUsername = await Promise.all(
        posts.map(async (post) => {
          const usernameQuery = "SELECT username FROM user WHERE user_id = ?";
          const usernameData = await new Promise((resolve, reject) => {
            db.query(usernameQuery, [post.user_id], (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
          return {
            ...post,
            username: usernameData[0]?.username || null,
          };
        })
      );
  
      res.json(postWithUsername);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
  
  
  export default router;