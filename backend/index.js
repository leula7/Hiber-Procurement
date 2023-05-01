import cors from "cors";
import express, { response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import MarketOfficer from './routers/MarketOfficer.js';
import General from './routers/General.js';
import Assistant from './routers/Assistant.js';
import BranchManager from './routers/BranchManager.js';
import Auth from './routers/Auth.js';
import Supplier from './routers/Supplier.js';
import Chat from './routers/chat.js';

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

//General 
app.use('/', General);

//Chat
app.use('/', Chat);

//Auth
app.use('/', Auth);

//Branch Assistant 
app.use('/', Assistant);

//Branch Manager
app.use('/', BranchManager);

//Suplier
app.use('/', Supplier);

// Market Officer
app.use('/', MarketOfficer);

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log("Connected to backend.",PORT);
});
=======
  console.log("Connected to my backend.",PORT);
});
>>>>>>> 7b0bc7f34190bf1af84adaa6695845e06ecd431a
