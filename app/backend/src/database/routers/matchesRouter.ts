import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();
router.get('/', (req, res) => MatchesController.listMatches(req, res));

export default router;
