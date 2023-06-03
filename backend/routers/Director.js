import {Router} from 'express';
import {  SetTasks, getnoneFiltered } from '../controller/Director.controller.js';

const router = Router();

  router.get('/nonfilterd',getnoneFiltered);
  router.post('/settasks',SetTasks);

  export default router;