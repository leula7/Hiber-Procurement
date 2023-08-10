import sequelize from '../connection/database.js';
import Proposal from '../model/Approval/Approve.model.js';

  export const proposal = async (req, res) => {
    try {
      const query = 'SELECT * FROM proposal';
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error occurred while fetching proposals"
      });
    }
  };

  export const ApproveProposal = async (req, res) => {
    try {
      console.log("jase: ",req.body);
      const propId = req.body.prop_id;
      const checkedBy = req.body.user_id;
      const status = req.body.status; // 0 or 1
      const result = await Proposal.update(
        {
          checked_by: checkedBy,
          status: status,
        },
        {
          where: {
            prop_id: propId,
          },
        }
      );

      if (result[0] > 0) {
        res.status(200).json({
          error: '200',
          message: 'Approved successfully.',
        });
      } else {
        res.status(400).json({
          error: '400',
          message: 'Failed to approve.',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: '500',
        message: 'Internal server error.',
      });
    }
  };

  export const proposalcatagories = async (req, res) => {
    try {
      const date = req.params.date;

      const proposals = `SELECT cata_Name,cat_id, SUM(tot) as total,prop_id
                        FROM (
                          SELECT c.cata_Name, c.cat_id,p.prop_id, (i.price * ar.quantity) as tot
                          FROM proposal p
                          left join filter_needs fn on fn.Date = p.date
                          LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
                          LEFT JOIN additional_request ar ON ar.add_id = ra.req_id
                          LEFT JOIN item i ON i.item_id = ar.item_id
                          LEFT JOIN catagory c ON c.cat_id = i.cat_id
                          WHERE YEAR(fn.Date) = 2023 AND c.cata_Name IS NOT NULL

                          UNION ALL

                          SELECT c.cata_Name, c.cat_id,p.prop_id, (i.price * rp.quantity) as tot
                          FROM proposal p 
                          left join filter_needs fn on fn.Date = p.date
                          LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
                          LEFT JOIN replacement rp ON rp.rep_id = ra.req_id
                          LEFT JOIN item i ON i.item_id = rp.item_id
                          LEFT JOIN catagory c ON c.cat_id = i.cat_id
                          WHERE YEAR(fn.Date) = 2023 AND c.cata_Name IS NOT NULL
                        ) AS subquery
                        GROUP BY subquery.cata_Name`;

      const result = await sequelize.query(proposals, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { date: date },
      });

      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error occurred while fetching proposals",
      });
    }
  };

  export const proposaldetail = async(req,res)=>{
    
      if(req.params.date == null || req.params.cat_id == null){
        return;
      }
    
    const Cat_id = req.params.cat_id;
    const date = req.params.date;
    const proposaldetail = `SELECT b.Branch_id,i.item_name,b.Branch_Name,ar.quantity,i.price,(i.price*ar.quantity) as total
                            FROM filter_needs fn
                            LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
                            LEFT JOIN additional_request ar ON ar.add_id = ra.req_id
                            LEFT JOIN item i ON i.item_id = ar.item_id
                            LEFT JOIN catagory c ON c.cat_id = i.cat_id
                            LEFT JOIN user u ON u.user_id= ar.user_id
                            LEFT JOIN branch b ON b.Branch_id = u.branch_id
                            WHERE YEAR(fn.Date) = YEAR(:dates) AND c.cata_Name IS NOT NULL AND c.cat_id = 1
                            
                            UNION ALL

                            SELECT b.Branch_id, i.item_name,b.Branch_Name,rp.quantity,i.price,(i.price*rp.quantity) as total
                            FROM filter_needs fn
                            LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
                            LEFT JOIN replacement rp ON rp.rep_id = ra.req_id
                            LEFT JOIN item i ON i.item_id = rp.item_id
                            LEFT JOIN catagory c ON c.cat_id = i.cat_id
                            LEFT JOIN user u on u.user_id = rp.user_id
                            LEFT JOIN branch b ON b.Branch_id = u.branch_id
                            WHERE YEAR(fn.Date) = YEAR(:dates)  AND c.cata_Name IS NOT NULL AND c.cat_id = 1`;
    
          try {
               const result= await sequelize.query(proposaldetail,{
              replacements: { cat_id: Cat_id, dates: date },
              type: sequelize.QueryTypes.SELECT });
            res.status(200).send(result);
          } catch (error) {
            console.error(error);
            res.status(500).send({
              message: "Error occurred while fetching proposals "+Cat_id
            });
          }
    }

