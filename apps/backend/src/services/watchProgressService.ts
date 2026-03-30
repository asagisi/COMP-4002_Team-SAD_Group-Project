import prisma from '../prismaClient.js';
import type { WatchProgress } from '@prisma/client';

export const WatchProgressService = {
    getAll: async (): Promise<WatchProgress[]> =>
        prisma.watchProgress.findMany(),

    getById: async (id: number): Promise<WatchProgress | null> =>
        prisma.watchProgress.findUnique({ where: { id } }),

    create: async (data: Partial<WatchProgress>): Promise<WatchProgress> =>
        prisma.watchProgress.create({ data }),

    update: async (id: number, data: Partial<WatchProgress>): Promise<WatchProgress> =>
        prisma.watchProgress.update({ where: { id }, data }),

    delete: async (id: number): Promise<WatchProgress> =>
        prisma.watchProgress.delete({ where: { id } }),
};