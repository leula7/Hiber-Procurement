import sequelize from '../connection/database.js';
import { filterdata } from './MarketOfficer.controller.js';
import SetTask from '../model/Director/SetTask.model.js';

  export const getnoneFiltered = async(req,res)=>{
    const noneFiltered = `SELECT a.add_id AS request_id, b.branch_name, b.branch_id,
                          a.user_id, i.item_name, i.item_id, i.price, a.quantity, 
                          'Additional' AS purpose, a.time_of_purchase,
                          ra.req_app_id, ra.user_id, ra.req_status
                          FROM request_approve ra
                          LEFT JOIN additional_request a ON a.add_id = ra.req_id 
                          JOIN item i ON a.item_id = i.item_id 
                          JOIN user us ON a.user_id = us.user_id 
                          JOIN branch b ON us.branch_id = b.branch_id 
                          WHERE ra.req_status = 'Approve'
                          AND ra.req_app_id NOT IN (
                          SELECT fn.filter_req_app
                          FROM filter_needs fn
                          )
                          UNION 
                          SELECT r.rep_id AS request_id, b.branch_name, b.branch_id,
                          r.user_id, i.item_name, i.item_id, i.price, r.quantity, 'Replacement' AS purpose, 
                          r.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status
                          FROM request_approve ra
                          LEFT JOIN replacement r ON r.rep_id = ra.req_id 
                          JOIN item i ON r.item_id = i.item_id 
                          JOIN user us ON r.user_id = us.user_id
                          JOIN branch b ON us.branch_id = b.branch_id 
                          WHERE ra.req_status = 'Approve'
                          AND ra.req_app_id NOT IN (
                          SELECT fn.filter_req_app
                          FROM filter_needs fn
                          )
                          ORDER BY branch_id`;

        try {
          const result = await sequelize.query(noneFiltered, {
            type: sequelize.QueryTypes.SELECT,
          });

          res.json({ result });
        } catch (error) {
          res.json({ message: error.message });
        }

    };

    export const SetTasks = async(req,res)=>{
      const {dire_id,emp_id,cat_id,task_desc} = req.body;
      const taskParams = {
        dire_id,
        emp_id,
        cat_id,
        task_desc,
        status: 0, // Provide the default status value here
        date: new Date(),
      };

      try {
          const newTask = await SetTask.create(taskParams)
          if(newTask){
            res.json({"message": "Task Set"});
          }
      } catch (error) {
        res.json({
          "error": error.message
        })
      }
    }


  export const filterdatas = filterdata;