import mysql from "mysql";
import cors from "cors";
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userdata",
  });


  const user_id = 12;


  app.post("/post",(req,res)=>{
    //const filepath = req.body.filepath;
    const filepath = 'C:/Users/leulk/Desktop/Impo_File/javaAss.pdf';
    console.log('getting')
    const user_id = req.body.user_id;
    const timestamp = new Date().getTime();
    const uniqueFilename  = `${user_id}_${timestamp}_${fileName}`;
    var newdata
    fs.readFile(filepath,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        newdata = data;

        const fileData = data.toString('base64');
        console.log('File insert success: '+data)
      });
    fs.writeFile(`./uploads/${uniqueFilename}`,fileData,(err)=>{
        if(err){
            console.error(err);
            res.status(500).send('Failed to Upload');
            return;
        }else{
            console.error("upload success");
        }
    })
  })