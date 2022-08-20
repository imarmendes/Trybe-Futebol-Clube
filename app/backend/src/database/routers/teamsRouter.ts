import { Router } from 'express';
import TeamsController from '../controllers/temsController';

const router = Router();
router.get('/', (req, res) => TeamsController.listAll(req, res));
router.get('/:id', (req, res) => TeamsController.list(req, res));

export default router;
