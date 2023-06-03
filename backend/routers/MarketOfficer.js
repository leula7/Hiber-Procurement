import {Router} from 'express';
import { GenerateBids, doneTasks, filter_documnet, filterdata, filtered_data, generateBid, generateProposal, generatedocument, 
  getTasks, 
  quarterPrice, setprice, techDoc, technical_documnets, 
  updateCatagory, updateItem } from '../controller/MarketOfficer.controller.js';


const router = Router();

  router.get("/generated-document",generatedocument);

  router.get("/technical-documents",technical_documnets);

  router.post("/bid",generateBid);
  
  router.put("/setprice/:item_id/:price",setprice);
  
  router.put("/update-catagory/:cat_id/:cata_Name",updateCatagory);
  
  router.put("/update-item/:item_id/:item_name",updateItem);

  router.get("/technical-documents",techDoc);
  
  //Action Plan
  router.get("/quarter-price",quarterPrice);

  router.post("/filterdata", filterdata);
  
  router.get("/filterd-data/:cat_id",filtered_data);

  router.get("/filter-document",filter_documnet);

  router.post("/generateproposal",generateProposal);

  router.post("/generateproposal",getTasks);

  router.post("/generateproposal",doneTasks);

  router.post("/generatebid",GenerateBids);
  
  export default router;