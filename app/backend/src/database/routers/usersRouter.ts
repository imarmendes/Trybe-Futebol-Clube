import { Router } from 'express';
import UserController from '../controllers/usersController';

const router = Router();
router.post('/', (req, res) => UserController.login(req, res));
router.get('/validate', (req, res) => UserController.validate(req, res));

export default router;
