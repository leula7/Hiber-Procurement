import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';
import md5 from "md5";
import { expressjwt } from "express-jwt";
import  Jwt  from "jsonwebtoken";
import path from "path";

const router = Router();
  const secret =process.env.ACCESS_TOKEN_SECRET;
  const protect= expressjwt({ secret: secret,algorithms: ['HS256'] });
  router.post('/register',async (req, res) => {
      try{
      //get input from user
      const fname = req.body.fname;
      const position = req.body.position;
      const lname = req.body.lname;
      const branch_id = req.body.branch_id;
      const username = req.body.username;
      const password = req.body.password;
      const tinnumber = req.body.tinnumber;
      const spec = req.body.spec;
      const hashedPassword = md5(password);
        
      //sample sql query
      var registerQuery = "INSERT INTO ?? VALUES ('', ?, ?,?, ?, ?)";
      var registerParams = [fname, lname,position,branch_id,username, hashedPassword];
    
      if(position === "supplier"){
        
      }else if(position === "concerned_dep"){
        
      }else{
        registerQuery = "insert into user values ('',?,?,?,?,?,?)";
        registerParams = [fname, lname,position,branch_id,username, hashedPassword];
      }
      const result = await executeQuery(registerQuery,registerParams);
    
      if (result.affectedRows > 0) {
        const userDir = path.join('uploads', username);
        if(position ==='supplier' || position==='marketofficer'){
        if (fs.existsSync(userDir)) {
          console.log("Folder Already Exists");
        } else {
          fs.mkdir(userDir, (err) => {
            if (err) {
              console.error("Error While Creating Folder", err);
                res.json({
                "error": "500",
                "message": "Internal Server Error"
              });
            } else {
              console.log("Folder Created Successfully");
              res.status(200).json({
                "error": "200",
                "message": "Registration Successful"
              });
            }
          });
        }
      }else{
        res.status(200).json({
          "error": "200",
          "message": "Registration Successful"
        });
      }
    }
      }catch(err){
        console.log(err);
        res.status(200).json({
          "error": "400",
          "message": err.message
        });
      }
    });
  
  router.post('/login', async (req, res)=> {
    try {
      const { username, position } = req.body;
      const password = md5(req.body.password);
      const values = [username,password,position];
      let login = 'SELECT user_id,position,branch_id,username FROM user WHERE username = ? AND password = ? AND position = ?';
  
      if(!username && !password && !position){
        res.json({
          "user": {},
          "error": "400",
          "message": "Empty credentials"
        });
  
      }else{
        if(position === "concerned"){
          login = 'SELECT user_id,position,branch_id,username FROM user WHERE username = ? AND password = ? AND position = ?'
        }
        const results = await executeQuery(login,values);
  
        if(results.length >0){
          const user = {
            user_id: results[0].user_id,
            position: results[0].position,
            username: results[0].username,
          };
  
          const token = Jwt.sign({
            user_id: user.user_id,
            username: user.username,
            position: user.position
          },secret,{expiresIn: '1hr', algorithm: 'HS256'});
  
            const branchname = `SELECT b.branch_name,b.Branch_id FROM branch b 
          JOIN user u ON b.branch_id = u.branch_id WHERE b.branch_id = u.branch_id 
          AND user_id = ?;`;
          const branch = await executeQuery(branchname,user.user_id);
          res.json({
                    ...user,
                    "position":position,
                    branch_name: branch[0].branch_name,
                    Branch_id: branch[0].Branch_id,
                    "error": "200",
                    "message": "Login Success",
                    token
                  });
                  console.log("Login Success");
          }else{
            res.json({
              "error": "400",
              "message": "Login Error",
            });
          }
          
      }
    } catch (error) {
      console.log("error: ",error)
    }
    });

export default router