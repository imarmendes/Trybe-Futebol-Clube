import { Router } from 'express';
import UserController from '../controllers/usersController';

const router = Router();
router.post('/', (req, res) => UserController.login(req, res));

export default router;
