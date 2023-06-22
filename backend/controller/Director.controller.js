import sequelize from '../connection/database.js';
import { filterdata } from './MarketOfficer.controller.js';
import SetTask from '../model/Director/SetTask.model.js';

  export const getnoneFiltered = async(req,res)=>{
    const noneFiltered = `CALL GetNonFilteredRequests()`;

        try {
          const result = await sequelize.query(noneFiltered, {
            type: sequelize.QueryTypes.PROCEDURE,
          });

          res.status(200).json(result);
        } catch (error) {
          res.json({ message: error.message });
        }

    };

    export const CatagoryStatus = async (req, res) => {
      const prop_id = req.params.prop_id;
      const catagoryStatus = `CALL GetCategoryStatus(:prop_id)`; // Modify the procedure call
    
      try {
        const result = await sequelize.query(catagoryStatus, {
          replacements: {prop_id: prop_id},
          type: sequelize.QueryTypes.PROCEDURE,
        });
    
        res.status(200).json(result);
      } catch (error) {
        res.json({ message: error.message });
      }
    };
    

    export const ApprovedProposal = async(req,res)=>{
      try {
        const approvedProposal = `select * from proposal where status = 1`;
      
        const result = await sequelize.query(approvedProposal, {
          type: sequelize.QueryTypes.SELECT,
        });
      
        res.status(200).send({
          result,
        });
      }catch (error) {
        console.error(error);
        res.status(500).send({
          message: error,
        });
    }
  }

    export const getEmployees = async(req,res)=>{
      try {
        const getEmp = `select * from user where position = 'marketofficer'`;
      
        const result = await sequelize.query(getEmp, {
          type: sequelize.QueryTypes.SELECT,
        });
      
        res.status(200).send({
          result,
        });
      }catch (error) {
        console.error(error);
        res.status(500).send({
          message: error,
        });
    }
  }

    export const SetTasks = async(req,res)=>{
      const {dire_id,emp_id,cat_id,task_desc,prop_id} = req.body;
      console.log(req.body);
      const taskParams = {
        dire_id,
        emp_id,
        cat_id,
        prop_id,
        task_desc,
        status: 0, // Provide the default status value here
        date: new Date(),
      };

      try {
          const newTask = await SetTask.create(taskParams)
          if(newTask){
            res.status(200).json({"status":"200","message": "Task Set"});
          }
      } catch (error) {
        res.json({
          "error": error.message
        })
      }
    }

  export const filterdatas = filterdata;