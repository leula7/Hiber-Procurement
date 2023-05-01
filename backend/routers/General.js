import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';

const router = Router();

router.get('/branch',async(req,res)=>{
    try {
      const branchQuery = "select Branch_id,Branch_Name from branch";
      const branch = await executeQuery(branchQuery);
      res.json(branch);
    } catch (error) {
      console.log("/branch=>",error);
      res.json(err);
    }
  });

  router.get('/branchname/:user_id',async(req,res)=>{
    try{
      const user_id = req.params.user_id;
      console.log("/branchname/userid ",user_id);
      const branchname = `SELECT b.branch_name,b.Branch_id FROM branch b 
      JOIN manager m ON b.branch_id = m.branch_id WHERE b.branch_id = m.branch_id 
      AND m.man_id = ?;`;
      const branch = await executeQuery(branchname,user_id);
      res.status(200).send({
        branch
      });
    }catch(err){
      console.error(err);
      res.status(500).send({
        message: "Error occurred while fetching the pending requests"
      });
    } 
  });
  
  router.get('/items',async(req,res)=>{
    try {
      const itemQuery = "select *from item";
      const items= await executeQuery(itemQuery);
      res.json(items);
    } catch (error) {
      res.json(err);
    }
  });
  
  router.get('/items/:cat_id',async(req,res)=>{
    try {
      const itemQuery = "select `item_id`,`item_name`,`price`,item.cat_id,cata_Name from item RIGHT JOIN catagory ON item.cat_id =?";
      const cat_id = req.params.cat_id;
      if(cat_id !=-1){
         const item= await executeQuery(itemQuery,cat_id);
         res.json(item);
      }else{
        const itemQuerys = "select `item_id`,`item_name`,`price`,item.cat_id,cata_Name from item RIGHT JOIN catagory ON item.cat_id =catagory.cat_id";
        const items= await executeQuery(itemQuerys,cat_id);
        res.json(items);
      }
    } catch (error) {
      res.json(err);
    }
  });
  
  router.get('/cats',async(req,res)=>{
    try {
      const catQuery = "select *from catagory";
      const cats= await executeQuery(catQuery);
      res.json(cats);
    } catch (error) {
      res.json(err);
    }
  });

  export default router;