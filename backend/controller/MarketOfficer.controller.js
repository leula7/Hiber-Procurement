import { Sequelize } from 'sequelize';
import sequelize from '../connection/database.js';
import Item from '../model/MarketOfficer/SetItem.model.js';
import { Bid } from '../model/MarketOfficer/bid.model.js';
import Category from '../model/MarketOfficer/updateCatagory.model.js';

export const generatedocument = async(req,res)=>{
  const getDocument = `
    SELECT a.add_id as request_id, b.branch_name, b.branch_id, fn.filter_req_app,
      a.user_id, i.item_name, i.item_id, i.price, a.quantity, 'Additional' AS purpose,
      a.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status
    FROM filter_needs fn
    LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
    LEFT JOIN additional_request a ON ra.req_id = a.add_id
    LEFT JOIN item i ON a.item_id = i.item_id
    LEFT JOIN user us ON a.user_id = us.user_id
    LEFT JOIN branch b ON us.branch_id = b.branch_id
    WHERE ra.req_app_id IS NOT NULL
    UNION ALL
    SELECT r.rep_id as request_id, b.branch_name, b.branch_id, fn.filter_req_app,
      r.user_id, i.item_name, i.item_id, i.price, r.quantity, 'Replacement' AS purpose,
      r.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status
    FROM filter_needs fn
    LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
    LEFT JOIN replacement r ON ra.req_id = r.rep_id
    LEFT JOIN item i ON r.item_id = i.item_id
    LEFT JOIN user us ON r.user_id = us.user_id
    LEFT JOIN branch b ON us.branch_id = b.branch_id
    WHERE ra.req_app_id IS NOT NULL;`;

      try {
        const result = await sequelize.query(getDocument, {
          type: sequelize.QueryTypes.SELECT,
        });

        res.json({ result });
      } catch (error) {
        res.json({ message: error.message });
      }

  };

  export const technical_documnets = async(req,res)=>{
    const { supplier_id, position } = req.query;

    let filesQuery = "SELECT * FROM files";
    const filesParams = [];
    
    if (position === "supplier") {
      filesQuery = "SELECT * FROM files WHERE supplier_id = ?";
      filesParams.push(supplier_id);
    }
    
    try {
      const response = await sequelize.query(filesQuery, {
        type: sequelize.QueryTypes.SELECT,
        replacements: filesParams,
      });
    
      res.json({ response });
    } catch (error) {
      res.json({ message: error.message });
    }
    
  };

  export const setprice = async(req,res)=>{
    try {
      const { item_id, price } = req.params;
    
      const item = await Item.update(
        { price: price },
        { where: { item_id: item_id } }
      );
    
      if (item[0] > 0) {
        res.json({ message: "Price Updated", row: item[0] });
      } else {
        res.json({ row: item[0] });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "200", message: error.message });
    }
    
  };

  export const generateBid = async(req,res)=>{
    try {
      const { user_id, catagory, quantity, price, unit, procureType } = req.body;
      console.log(req.body);
      const response = await Bid.create({
        user_id: user_id,
        cat_id: catagory,
        quantity: quantity,
        price: price,
        unit: unit,
        tender_type: procureType
      });
      
      if (response) {
        res.json({ "message": "Bid Generated", "row": response.affectedRows });
      } else {
        res.json({ "row": response.affectedRows });
      }
    } catch (error) {
      console.log(error);
      res.json({
        "error": "200",
        "message": error.message
      });
    }
    
  };

  export const updateCatagory = async(req,res)=>{
    try {
      const { cat_id, cata_Name } = req.params;
  
      const result = await Category.update(
        { cata_Name },
        { where: { cat_id } }
      );
  
      if (result[0] > 0) {
        res.json({ message: 'Category Updated' });
      } else {
        res.json({ message: 'No rows updated' });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: '200', message: error.message });
    }
  };

  export const updateItem = async(req,res)=>{
      try {
        const { item_id, item_name } = req.params;
        const result = await Item.update(
          { item_name: item_name },
          { where: { item_id: item_id } }
        );
        if (result[0] > 0) {
          res.json({ message: 'Item Updated' });
        } else {
          res.json({ message: 'Item not found' });
        }
      } catch (error) {
        console.log(error);
        res.json({ error: '400', message: error.message });
      }
  };

  export const techDoc = async(req,res)=>{
    const {supplier_id,position} = req.query;

      let filesQuery = "SELECT * FROM files WHERE supplier_id = ?";
      if (position === "supplier") {
        filesQuery = "SELECT * FROM files WHERE supplier_id = ?";
      } else {
        filesQuery = "SELECT * FROM files";
      }

      const response = await sequelize.query(filesQuery, {
        replacements: [supplier_id],
        type: sequelize.QueryTypes.SELECT
      });

      res.json({
        response
      });
};

  export const quarterPrice = async(req,res)=>{
      const quarterPrice =  `  SELECT i.cat_id, c.cata_Name, r.time_of_purchase AS quarter, i.cat_id AS item_cat_id,
                              fn.filter_req_app,ra.req_app_id,ra.req_status,r.rep_id,ra.req_id,i.item_id,i.price
                              FROM filter_needs fn 
                              LEFT JOIN request_approve ra on fn.filter_req_app = ra.req_app_id
                              LEFT JOIN replacement r on ra.req_id = r.rep_id
                              LEFT JOIN item i on r.item_id = i.item_id
                              LEFT JOIN catagory c on c.cat_id = i.cat_id
                              
                              UNION ALL
                              
                              SELECT i.cat_id, c.cata_Name, a.time_of_purchase AS quarter, i.cat_id AS item_cat_id,
                              fn.filter_req_app,ra.req_app_id,ra.req_status,a.add_id,ra.req_id,i.item_id,i.price
                              FROM filter_needs fn 
                              LEFT JOIN request_approve ra on fn.filter_req_app = ra.req_app_id
                              LEFT JOIN additional_request a on ra.req_id = a.add_id
                              LEFT JOIN item i on a.item_id = i.item_id
                              LEFT JOIN catagory c on c.cat_id = i.cat_id`;
      try {
          const result = await sequelize.query(quarterPrice, {
          type: sequelize.QueryTypes.SELECT
        });
        res.json({ result });
      } catch (error) {
        res.json({ message: error.message });
      }
  }

  export const filterdata = async (req, res) => {
    const filters = req.body;
    try {
      await sequelize.transaction(async (t) => {
        const filterRespons = await Promise.all(
          filters.map((filter) =>
            FilteredNeed.create(
              {
                user_id: filter.user_id,
                request_id: filter.request_id,
              },
              { transaction: t }
            )
          )
        );
        const affectedRows = filterRespons.length;
        if (affectedRows > 0) {
          res.json({
            error: '200',
            message: 'Success Filtration',
          });
        }
      });
    } catch (error) {
      console.log('filterdata/  ', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.json({
          error: '400',
          message: 'Already Filtered this need',
        });
      } else {
        res.json({
          error: '400',
          message: 'Error while filtering',
        });
      }
    }
  };

  export const filtered_data= async (req, res) => {
        const { cat_id } = req.params;
        let getFilteredData = `SELECT a.add_id as request_id, b.branch_name, b.branch_id,
            a.user_id, i.item_name, i.item_id, i.price, a.quantity, 'Additional' 
            as purpose, a.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status FROM filter_needs fn
            LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
            LEFT JOIN additional_request a ON a.add_id = ra.req_id 
            JOIN item i ON a.item_id = i.item_id 
            JOIN user us ON a.user_id = us.user_id 
            JOIN branch b ON us.branch_id = b.branch_id WHERE i.cat_id = ?
            UNION 
            SELECT r.rep_id as request_id, b.branch_name, b.branch_id,
            r.user_id, i.item_name, i.item_id, i.price, r.quantity, 
            'Replacement' as purpose, r.time_of_purchase, ra.req_app_id, 
            ra.user_id, ra.req_status FROM filter_needs fn
            LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
            LEFT JOIN replacement r ON r.rep_id = ra.req_id 
            JOIN item i ON r.item_id = i.item_id 
            JOIN user us ON r.user_id = us.user_id
            JOIN branch b ON us.branch_id = b.branch_id WHERE i.cat_id = ? ORDER BY branch_name`;

        try {
          if (cat_id == -1) {
            getFilteredData = `SELECT a.add_id as request_id, b.branch_name, b.branch_id,
                                a.user_id, i.item_name, i.item_id, i.price, a.quantity, 'Additional' 
                                as purpose, a.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status FROM filter_needs fn
                                LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
                                LEFT JOIN additional_request a ON a.add_id = ra.req_id 
                                JOIN item i ON a.item_id = i.item_id 
                                JOIN user us ON a.user_id = us.user_id 
                                JOIN branch b ON us.branch_id = b.branch_id
                                UNION 
                                SELECT r.rep_id as request_id, b.branch_name, b.branch_id,
                                r.user_id, i.item_name, i.item_id, i.price, r.quantity, 
                                'Replacement' as purpose, r.time_of_purchase, ra.req_app_id, 
                                ra.user_id, ra.req_status FROM filter_needs fn
                                LEFT JOIN request_approve ra ON fn.filter_req_app = ra.req_app_id
                                LEFT JOIN replacement r ON r.rep_id = ra.req_id 
                                JOIN item i ON r.item_id = i.item_id 
                                JOIN user us ON r.user_id = us.user_id
                                JOIN branch b ON us.branch_id = b.branch_id ORDER BY branch_name`;
          }
          
          const result = await sequelize.query(getFilteredData, {
            replacements: [cat_id, cat_id],
            type: QueryTypes.SELECT,
          });
          
          res.json({ result });
        } catch (error) {
          res.json({ message: error.message });
        }
    };

  export const filter_documnet = async (req, res) => {
    const getDocumnet = `
      SELECT a.add_id AS request_id, b.branch_name, b.branch_id,
        a.user_id, i.item_name, i.item_id, i.price, a.quantity, 'Additional' AS purpose, a.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status
      FROM request_approve ra
      LEFT JOIN additional_request a ON a.add_id = ra.req_id 
      JOIN item i ON a.item_id = i.item_id 
      JOIN user us ON a.user_id = us.user_id 
      JOIN branch b ON us.branch_id = b.branch_id 
      WHERE ra.req_status = 'Approve'
      AND NOT EXISTS (
        SELECT 1
        FROM filter_needs fn
        WHERE fn.filter_req_app = ra.req_app_id
      )
      UNION 
      SELECT r.rep_id AS request_id, b.branch_name, b.branch_id,
        r.user_id, i.item_name, i.item_id, i.price, r.quantity, 'Replacement' AS purpose, r.time_of_purchase, ra.req_app_id, ra.user_id, ra.req_status
      FROM request_approve ra
      LEFT JOIN replacement r ON r.rep_id = ra.req_id 
      JOIN item i ON r.item_id = i.item_id 
      JOIN user us ON r.user_id = us.user_id
      JOIN branch b ON us.branch_id = b.branch_id 
      WHERE ra.req_status = 'Approve'
      AND NOT EXISTS (
        SELECT 1
        FROM filter_needs fn
        WHERE fn.filter_req_app = ra.req_app_id
      )
      ORDER BY branch_id`;
  
    try {
      const result = await sequelize.query(getDocumnet, {
        type: Sequelize.QueryTypes.SELECT,
      });
  
      res.json({ result });
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  export const generateProposal = async (req, res) => {
    const user_id = req.body.user_id;
    
    const propos = `INSERT INTO proposal (user_id, cat_id, total_price)
    SELECT ${user_id},subquery.cat_id,subquery.total_price
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
LIMIT 0, 25;`;
  
    try {
      await sequelize.query(propos, {
        type: Sequelize.QueryTypes.INSERT,
      });
  
      res.json({ message: 'Insertion successful' });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  