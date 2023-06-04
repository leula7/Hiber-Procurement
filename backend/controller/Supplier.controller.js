import mime from 'mime-types';
import fs from 'fs';
import FinanceDetail from '../model/supplier/financial_detail.model.js';
import TechnicalDocment from '../model/supplier/technical_detail.model.js';


export const uploadsTechnical = async (req, res) => {
  try {
    const { sup_id, bid_id, username } = req.body;
    const oldname = req.file.filename;
    const fileType = mime.extension(req.file.mimetype);
    const newname = req.file.originalname;
    const timestamp = Date.now();
    const uniqueFilename = `${newname}_${timestamp}`;
    const uploadPath = `./uploads/${username}/${newname}`;
    const techparams = {
      sup_id,
      bid_id,
      file_name: uniqueFilename, // Add file_name value
      file_type: fileType, // Add file_type value
      date: new Date(),
    };

    try {
      const newTask = await TechnicalDocment.create(techparams);
      if (newTask) {
          await fs.rename(`./uploads/${oldname}`,uploadPath , (err) => {
            if (err) {
              throw err;
            }
          });
        return res.json({
          error: '200',
          message: 'upload success'
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};


  export const SetFinancial = async(req,res)=>{
    const {bid_item_id,sup_id,price} = req.body;
    const financeParam = {
      sup_id,
      bid_item_id,
      price,
      date: new Date(),
    };
  
    try {
        const newTask = await FinanceDetail.create(financeParam)
        if(newTask){
          res.json({"message": "financial post success"});
        }
    } catch (error) {
      res.json({
        "error": error.message
      })
    }finally{
      if(uploadPath){
        try {
          await fs.promises.unlink(uploadedFilePath);
        } catch (error) {
          console.error('Error deleting uploaded file:', error);
        } 
      }
    }
  }