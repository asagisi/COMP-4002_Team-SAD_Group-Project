import prisma from '../prismaClient.js';

export const watchProgressService = {
    getAll: async () => {
        return await prisma.watchProgress.findMany();
    },

    create: async (data: { showId: number, currentEpisode: number, status: 'NOT_STARTED' | 'WATCHING' | 'FINISHED' }) => {
        return await prisma.watchProgress.create({ data });
    },

    update: async (id: number, data: { currentEpisode?: number, status?: 'NOT_STARTED' | 'WATCHING' | 'FINISHED' }) => {
        return await prisma.watchProgress.update({
            where: { id },
            data,
        });
    },

    delete: async (id: number) => {
        return await prisma.watchProgress.delete({ where: { id } });
    },
};