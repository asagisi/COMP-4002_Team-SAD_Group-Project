import type { Request, Response } from 'express';
import { watchProgressService } from '../services/watchProgressService.js';

export const watchProgressController = {
    getAll: async (_req: Request, res: Response) => {
        const data = await watchProgressService.getAll();
        res.json(data);
    },

    create: async (req: Request, res: Response) => {
        const { showId, currentEpisode, status } = req.body;
        const item = await watchProgressService.create({ showId, currentEpisode, status });
        res.status(201).json(item);
    },

    update: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { currentEpisode, status } = req.body;
        try {
            const updated = await watchProgressService.update(id, { currentEpisode, status });
            res.json(updated);
        } catch {
            res.status(404).json({ message: 'Not found' });
        }
    },

    delete: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            await watchProgressService.delete(id);
            res.status(204).send();
        } catch {
            res.status(404).json({ message: 'Not found' });
        }
    },
};