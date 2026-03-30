import type { Request, Response } from 'express';
import { WatchProgressService } from '../services/watchProgressService.js';

export const WatchProgressController = {
    getAll: async (_req: Request, res: Response) => {
        const data = await WatchProgressService.getAll();
        res.json(data);
    },

    getById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const item = await WatchProgressService.getById(id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    },

    create: async (req: Request, res: Response) => {
        const data = await WatchProgressService.create(req.body);
        res.status(201).json(data);
    },

    update: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const data = await WatchProgressService.update(id, req.body);
        res.json(data);
    },

    delete: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        await WatchProgressService.delete(id);
        res.status(204).send();
    },
};