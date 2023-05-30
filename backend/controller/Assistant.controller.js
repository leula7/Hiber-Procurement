import { ReplacementRequest,AdditionalRequest } from '../model/Asisttant/Request.model.js';
import sequelize from '../connection/database.js';

export const requests = async (req, res, next) => {
    try {
      const { user_id, type, item_id, quantity, time_of_purchase, title_of_post, 
        other_reason, tag_no, service_year, frequency_of_rep, book_value } = req.body;
      let model;
      if (type === 'replacement') {
        model = ReplacementRequest;
      } else if (type === 'additional_request') {
        model = AdditionalRequest;
      } else {
        throw new Error(`Invalid table type: ${type}`);
      }

      const request = await model.create({
        user_id,
        item_id,
        quantity,
        time_of_purchase,
        title_of_post,
        other_reason,
        tag_no,
        service_year,
        frequency_of_rep,
        book_value,
      }, {
        fields: ['user_id', 'item_id', 'quantity', 'time_of_purchase', 'title_of_post', 'other_reason', 'tag_no', 'service_year', 'frequency_of_rep', 'book_value'],
      });

      res.status(200).send({
        message: `Successfully created ${type} request with ID ${request.id}`,
        request_id: request.id,
      });
    } catch (error) {
      console.log("Request Error:", error);
      next(error);
      res.json({
        message: "Error occurred while creating the request",
      });
    }
}

export const approveRequest = async (req, res) => {
  try {
        const Assistant_id = req.params.user_id;
        const result = await sequelize.query(`
          SELECT ra.req_id AS request_id, 
          b.branch_name, b.branch_id, u.user_id, i.item_name, 
          i.item_id, i.price, a.quantity, 'Additional' AS purpose, a.time_of_purchase,
          ra.req_app_id, ra.user_id, ra.req_status
          FROM request_approve ra 
          JOIN additional_request a ON a.add_id = ra.req_id 
          JOIN item i ON a.item_id = i.item_id 
          JOIN user u ON a.user_id = u.user_id 
          JOIN branch b ON u.branch_id = b.branch_id 
          WHERE ra.req_status = 'Approve'
          AND u.user_id = :assistant_id
          
          UNION
          
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
          AND u.user_id = :assistant_id`, 
          {
          replacements: { assistant_id: Assistant_id },
          type: sequelize.QueryTypes.SELECT
        });
        res.status(200).send({
          approved: result
        });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error occurred while fetching the pending requests"
    });
  }
}

export const waitingReequest = async (req, res) => {
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
          AND u.user_id = :assistant_id
          
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
          AND u.user_id = :assistant_id`
    
      const result = await sequelize.query(ApproveQuery,{
      replacements: { assistant_id: Assistant_id },
      type: sequelize.QueryTypes.SELECT
    })
  
    res.status(200).send({
      approved: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error
    });
  }
}