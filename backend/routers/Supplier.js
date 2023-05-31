import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';
import multer from "multer";
import mime from 'mime-types';
import fs from 'fs';

const router = Router();

const upload = multer({dest: "./uploads/"});

router.post("/upload",upload.single("file"), async (req, res) => {
  try {
    //User Inputs
    const username = req.body.username;
    const user_id = req.body.user_id;
    //Organizing File
    const oldname = req.file.filename;
    const fileType = mime.extension(req.file.mimetype);
    const newname = req.file.originalname;
    const uploadfile = "insert into files values('',?,?,?)";
    const timestamp = Date.now();
    const uniqueFilename  = `${newname}_${timestamp}`;

    await fs.promises.rename(`./uploads/${oldname}`, `./uploads/${username}/${newname}`);
    const result = await executeQuery(uploadfile,[user_id,uniqueFilename,fileType]);
      if(result.affectedRows>0){
        console.log("got")
        res.json({
          error: '200',
          message: 'upload success'
        });
      }else{
        res.json({
          error: '400',
          message: 'upload Error'
        });
      }
  } catch (error) {
    console.log(error);
    res.json({
      error: '500',
      message: 'internal server error'
    });
  }
});

export default router;