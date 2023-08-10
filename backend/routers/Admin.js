import {Router} from 'express';
import {waitingReequest } from '../controller/Assistant.controller.js';
import {AddBranch, ApproveSupplier, Districts, Employee, Suppliers, addEmployee} from '../controller/Admin.controller.js';
import { branch } from '../controller/general.conntroller.js';



const router = Router();

  router.post('/addbranch',AddBranch);

  
  router.get('/employee',Employee);
  router.get('/suppliers',Suppliers);
  router.get('/district',Districts);
  router.get('/branch',branch);

  router.post('/addemployee',addEmployee);
  router.put("/approvesupplier",ApproveSupplier);
  router.put("/approveemployee",ApproveSupplier);
  router.get('/waiting-requests/:user_id', waitingReequest);

export default router;