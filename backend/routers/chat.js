
import {Router} from 'express';
import { executeQuery } from '../connection/executeQuery.js';

const router = Router();

  router.post('/chat',async(req,res)=>{
      const {sender,reciever,message} = req.body;
      const now = new Date();
      const time = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',second: 'numeric', hour12: true });
      const sendMessage = "insert into message values('',?,?,?,?)";
      try {
        const result =await executeQuery(sendMessage,[sender,reciever,message,time]);
        if(result.affectedRows>0){
          res.json({"message": "Message Sent"});
        }
      } catch (error) {
        console.log("/chat ",error)
        res.json({
          "error": error.message
        })
      }
    });
  
  router.get('/message/:sender/:reciever',async(req,res)=>{
    const {sender,reciever} = req.params;
    const getMessage = `select * from message where 
                        (sender = ? and reciever = ?) or
                         (sender = ? and reciever = ?)`;
    try {
      const result = await executeQuery(getMessage,[sender,reciever,reciever,sender]);
      res.json({result});
    } catch (error) {
      console.log("/chat ",error)
      res.json({
        "error": error.message
      });
    }
  });
  
  router.get('/users/:position',async(req,res)=>{
    const {position} = req.params;
    const getUsers = `SELECT u.user_id, u.username,m.time, m.message as "last_massage"
            FROM user u 
            LEFT JOIN message m ON u.user_id = m.sender OR u.user_id = m.reciever 
            WHERE m.msg_id = (
              SELECT MAX(msg_id) 
              FROM message 
              WHERE sender = u.user_id OR reciever = u.user_id
            ) OR m.msg_id IS NULL;
    `;
    try {
      const result =await executeQuery(getUsers,[position]);
      res.json({result});
    } catch (error) {
      console.log("/chat ",error)
      res.json({
        "error": error.message
      })
    }
  });

export default router