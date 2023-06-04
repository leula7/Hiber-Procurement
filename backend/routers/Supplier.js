import {Router} from 'express';
import multer from "multer";
import { SetFinancial, uploadsTechnical } from '../controller/Supplier.controller.js';


const router = Router();

const upload = multer({dest: "./uploads/"});

router.post("/uploadtechnical",upload.single("file"),uploadsTechnical)

router.post("/setfinancial",SetFinancial);


export default router;