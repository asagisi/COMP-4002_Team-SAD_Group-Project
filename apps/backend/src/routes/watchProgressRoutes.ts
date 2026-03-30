import { Router } from 'express';
import { WatchProgressController } from '../controllers/watchProgressController.js';

const router = Router();

router.get('/', WatchProgressController.getAll);
router.get('/:id', WatchProgressController.getById);
router.post('/', WatchProgressController.create);
router.put('/:id', WatchProgressController.update);
router.delete('/:id', WatchProgressController.delete);

export default router;