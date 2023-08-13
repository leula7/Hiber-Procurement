<<<<<<< HEAD
import cors from "cors";
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import verifyToken from "./verifyToken.js";
import MarketOfficer from './routers/MarketOfficer.js';
import General from './routers/General.js';
import Assistant from './routers/Assistant.js';
import BranchManager from './routers/BranchManager.js';
import Auth from './routers/Auth.js';
import Admin from './routers/Admin.js'
import Supplier from './routers/Supplier.js';
import Chat from './routers/chat.js';
import Approval from './routers/Approval.js';
import Director from './routers/Director.js'
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: 'connections.env'});

const app = express();


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.use(cors());

  app.use(bodyParser.json({limit: '50mb'}));

  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  const PORT = process.env.PORT;

  app.use((err, req, res, next) => {
  console.log("Use Error: ",err);
  if (err.name === "UnauthorizedError" && err.message === "jwt expired") {
  return res.json({
  "error": "JWT Expired",
  "message": "Your JWT token has expired. Please login again.",
  });
  }
  next(err);
  });

//   const allowedOrigins = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));



  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, 'build')));

  app.use('/', General);

  //Chat
  app.use('/', Chat);

  //Admin
  app.use('/', Admin);

  //Aproval 
  app.use('/',Approval);

  //Director 
  app.use('/',Director);

  //Auth
  app.use('/', Auth);

  //Branch Assistant 
  app.use('/', Assistant);

  //Branch Manager
  app.use('/', BranchManager);

  //Suplier
  app.use('/', Supplier);

  // Market Officer
  app.use('/',MarketOfficer);

  const host = '0.0.0.0';

  app.listen(PORT, () => {
    console.log("Connected to backend.",PORT);
  });
=======
import cors from "cors";
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import verifyToken from "./verifyToken.js";
import MarketOfficer from './routers/MarketOfficer.js';
import General from './routers/General.js';
import Assistant from './routers/Assistant.js';
import BranchManager from './routers/BranchManager.js';
import Auth from './routers/Auth.js';
import Admin from './routers/Admin.js'
import Supplier from './routers/Supplier.js';
import Chat from './routers/chat.js';
import Approval from './routers/Approval.js';
import Director from './routers/Director.js'
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: 'connections.env'});

const app = express();


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.use(cors());

  app.use(bodyParser.json({limit: '50mb'}));

  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  const PORT = process.env.PORT;

  app.use((err, req, res, next) => {
  console.log("Use Error: ",err);
  if (err.name === "UnauthorizedError" && err.message === "jwt expired") {
  return res.json({
  "error": "JWT Expired",
  "message": "Your JWT token has expired. Please login again.",
  });
  }
  next(err);
  });

//   const allowedOrigins = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));



  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, 'build')));

  app.use('/', General);

  //Chat
  app.use('/', Chat);

  //Admin
  app.use('/', Admin);

  //Aproval 
  app.use('/',Approval);

  //Director 
  app.use('/',Director);

  //Auth
  app.use('/', Auth);

  //Branch Assistant 
  app.use('/', Assistant);

  //Branch Manager
  app.use('/', BranchManager);

  //Suplier
  app.use('/', Supplier);

  // Market Officer
  app.use('/',MarketOfficer);

  const host = '0.0.0.0';

  app.listen(PORT, () => {
    console.log("Connected to backend.",PORT);
  });
>>>>>>> remove
