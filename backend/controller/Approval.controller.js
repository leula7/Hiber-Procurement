import sequelize from '../connection/database.js';
import Proposal from '../model/Approval/Approve.model.js';



export const proposal = async (req, res) => {
  const prop = `SELECT c.cata_Name,p.total_price,p.user_id,p.date,p.prop_id from proposal p
               LEFT JOIN catagory c on c.cat_id = p.cat_id`;

  try {
    const result= await sequelize.query(prop);
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
      const prop_id = req.params.prop_id;
      const checked_by = req.params.user_id;
      const status = req.params.status;// 0 or 1
      console.log(prop_id)
      const result = await Proposal.update({
          checked_by: checked_by,
          status: status,
        },
        {
          where: {
            prop_id: prop_id,
          },
        });
        console.log(req.params);
      if (result[0] > 0) {
        
        res.json({
          error: '200',
          message: 'Approve Successfully',
        });
      }
      else{
        res.json({
          error: '400',
          message: 'Approve UnSuccessfully',
        });
      }
    } catch (err) {
      res.json(err);
    }
}


/*
    SELECT subquery.cat_id, subquery.cata_Name, subquery.total_price
FROM (
  SELECT c.cat_id, c.cata_Name, SUM(ar.quantity * i.price) AS total_price
  FROM filter_needs fn
  LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
  LEFT JOIN additional_request ar ON ar.add_id = ra.req_id
  LEFT JOIN item i ON i.item_id = ar.item_id
  LEFT JOIN catagory c ON c.cat_id = i.cat_id
  WHERE i.cat_id = c.cat_id
  GROUP BY c.cat_id, c.cata_Name

  UNION

  SELECT c.cat_id, c.cata_Name, SUM(rp.quantity * i.price) AS total_price
  FROM filter_needs fn
  LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
  LEFT JOIN replacement rp ON rp.rep_id = ra.req_id
  LEFT JOIN item i ON i.item_id = rp.item_id
  LEFT JOIN catagory c ON c.cat_id = i.cat_id
  WHERE i.cat_id = c.cat_id
  GROUP BY c.cat_id, c.cata_Name
) AS subquery
GROUP BY subquery.cat_id, subquery.cata_Name
LIMIT 0, 25;

*/