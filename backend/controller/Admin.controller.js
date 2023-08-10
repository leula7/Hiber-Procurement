import { Supplier, User } from '../model/Auth/Auth.model.js';
import Branch from '../model/General/Branch.model.js'
import md5 from "md5";
import path from "path";
import nodemailer from 'nodemailer'
import sequelize from '../connection/database.js';

export const AddBranch = async (req, res, next) => {
    try {
            if(req.body ==null){
                es.status(200).json({
                    message: `Information missing`,
                    error: "400",
                  });
            }
            const {Branch_Name,District_id} = req.body;
              const branch = {
                Branch_Name,
                District_id
              };
            console.log("Branch: ",branch)
            const newbranch = await Branch.create(branch);
            if(newbranch){
                res.status(200).json({
                    message: `Branch Add Success`,
                    error: "200",
                  });
            }
    } catch (error) {
      console.log("Request Error:", error);
      next(error);
      res.json({
        message: "Error occurred while creating the request",
      });
    }
}

export const AddDistrict = async (req, res, next) => {
    try {
            if(req.body ==null){
                es.status(200).json({
                    message: `Information missing`,
                    error: "400",
                  });
            }
            const {Branch_Name,District_id} = req.body;
              const branch = {
                Branch_Name,
                District_id
              };
            console.log("Branch: ",branch)
            const newbranch = await Branch.create(branch);
            if(newbranch){
                res.status(200).json({
                    message: `Branch Add Success`,
                    error: "200",
                  });
            }
    } catch (error) {
      console.log("Request Error:", error);
      next(error);
      res.json({
        message: "Error occurred while creating the request",
      });
    }
}

export const Employee = async (req, res) => {
    const emps = `SELECT * from user`;

    try {
      const result= await sequelize.query(emps,{type: sequelize.QueryTypes.SELECT});
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error occurred while fetching Employee "+error
      });
    }
  };

  export const Districts = async (req, res) => {
    const discrict = `SELECT * from district`;

    try {
      const result= await sequelize.query(discrict,{type: sequelize.QueryTypes.SELECT});
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error occurred while fetching District "+error
      });
    }
  };

export const addEmployee = async (req, res, next) => {
    try {
        // Get input from user
        console.log(req.body);
        const { First_Name, Last_Name, position, branch_id, username, 
          password, tin_number, spec, email } = req.body;
        if (req.body == null) {
          return;
        }
        const hashedPassword = md5(password);
    
        console.log("Files: ", req.body);
        let registerParams;
        let model;
    
        registerParams = {
          First_Name,
          Last_Name,
          email,
          tin_number,
          username,
          email,
          password: hashedPassword,
        };
    
        if (position === 'supplier') {
          registerParams = {
            First_Name,
            Last_Name,
            position,
            email,
            tin_number,
            username,
            password: hashedPassword,
          };
          model = Supplier;
        } else if (position === 'concerned_dep') {
          // Handle concerned_dep registration logic if needed
        } else {
          registerParams = {
            First_Name,
            Last_Name,
            position,
            branch_id: branch_id,
            username,
            email,
            password: hashedPassword,
          };
          model = User;
        }
    
        const newUser = await model.create(registerParams);
    
        if (newUser) {
          const userDir = path.join('uploads', username);
    
          if (position === 'supplier') {
            createFolder(userDir, res);
          } else {
            SendPassword(email,password,username)
            res.status(200).json({
              error: '200',
              message: 'Employee Add Successful',
            });
          }
        }
      } catch (err) {
        console.log(err);
        res.status(200).json({
          error: '400',
          message: err.message,
        });
      }
}

  export const ApproveSupplier = async (req, res) => {
    try {
      const supid = req.body.sup_id;
      const aproved_by = req.body.user_id;
      const status = req.body.status; // 0 or 1
      let message = "";
      if(status == 1){
        message = "User Activate SuccessFully";
      }else{
        message = "User DeActivate SuccessFully";
      }
      const result = await Supplier.update(
        {
          aproved_by: aproved_by,
          status: status,
        },
        {
          where: {
            supplier_id: supid,
          },
        }
      );

      if (result[0] > 0) {
        res.status(200).json({
          error: '200',
          message: message,
        });
      } else {
        res.status(400).json({
          error: '400',
          message: 'Failed to approve. ',
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

  export const ApproveEmployee = async (req, res) => {
    try {
      const supid = req.body.sup_id;
      const aproved_by = req.body.user_id;
      const status = req.body.status; // 0 or 1
      let message = "";
      if(status == 1){
        message = "User Activate SuccessFully";
      }else{
        message = "User DeActivate SuccessFully";
      }
      const result = await User.update(
        {
          aproved_by: aproved_by,
          status: status,
        },
        {
          where: {
            supplier_id: supid,
          },
        }
      );

      if (result[0] > 0) {
        res.status(200).json({
          error: '200',
          message: message,
        });
      } else {
        res.status(400).json({
          error: '400',
          message: 'Failed to approve. ',
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

  export const Suppliers = async (req, res) => {
    const emps = `SELECT supplier_id,First_Name,Last_Name,username,status from supplier`;

    try {
      const result= await sequelize.query(emps,{type: sequelize.QueryTypes.SELECT});
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error occurred while fetching Employee "+error
      });
    }
  };
 //SEND EMAIL FOR fINANCIAL WINNER SUPPLIER
 export const SendPassword = async(email,Passoword,username)=>{
    
    try {

      const recipient = email;
        const subject = 'Congratulations! You are Registered';
        const message = " Your UserName Is =>"+username+'  Your Passoword is =>'+Passoword;
        sendEmail(recipient, subject, message);
    } catch (error) {
      console.log(error);
    } 
  }

  const sendEmail = async(to,subject,text)=>{

    const tranporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: "leulkahssaye1000@gmail.com",
        pass: "csujqjgvhpcwkvnm"
      }
    });

    const mailOptions = {
      from: "leulkahssaye1000@gmail.com",
      to: to,
      subject: subject,
      text: text
    };

    tranporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log(error);
        }else{
          console.log('Email Sent: '+info.response);
        }
    });
  }