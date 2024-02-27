import { Router } from "express";
import { privateRoute } from '../config/passport'
import * as apiController from '../controllers/main';

const router = Router();

router.get('/ping', apiController.ping);
router.get('/', apiController.mainR);
router.post('/login', apiController.login);
router.get('/list', privateRoute, apiController.list);

export default router;