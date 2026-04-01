import express from 'express';
import { watchProgressController } from '../controllers/watchProgressController';

const router = express.Router();

router.get('/', watchProgressController.getAll);
router.post('/', watchProgressController.create);
router.put('/:id', watchProgressController.update);
router.delete('/:id', watchProgressController.delete);

export default router;