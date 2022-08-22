import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();
router.get('/', (req, res) => MatchesController.listMatches(req, res));
router.post('/', (req, res) => MatchesController.createMatches(req, res));
router.patch('/:id/finish', (req, res) => MatchesController.finishMatches(req, res));
router.patch('/:id', (req, res) => MatchesController.updateMatches(req, res));

export default router;
