import {Router} from 'express';
import multer from "multer";
import { BidRegister, FinancialForm, GetBidPdf, MyDocument, Mytenders, 
    SetFinancial, TenderNews, uploadsTechnical } from '../controller/Supplier.controller.js';
import { GetBid } from '../controller/MarketOfficer.controller.js';


const router = Router();

const upload = multer({dest: "./uploads/"});

router.get("/tendernews",TenderNews);

router.get("/mydocument/:bid_id",MyDocument);

router.post("/tendernews/register",BidRegister);

router.get("/mytender/:sup_id",Mytenders);

router.get("/mytender/financialform/:bid_id",FinancialForm);

router.post("/mytender/technicalform",upload.single("file"),uploadsTechnical)

router.post("/mytender/financialform",SetFinancial);

router.post("/mytender/financialform/:sup_id",SetFinancial);

router.get("/bid-download/:bid_file",GetBidPdf);

export default router;