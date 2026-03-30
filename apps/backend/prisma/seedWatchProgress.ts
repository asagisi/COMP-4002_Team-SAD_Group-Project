import prisma from '../src/prismaClient.js';
import { WatchProgressList } from '../data/WatchProgressList.js';

// mapping front-end status strings to Prisma enum values
const statusMap: Record<string, 'NOT_STARTED' | 'WATCHING' | 'FINISHED'> = {
    "Not Started": "NOT_STARTED",
    "Watching": "WATCHING",
    "Finished": "FINISHED",
};

export const seedWatchProgress = async () => {
    for (const item of WatchProgressList) {
        await prisma.watchProgress.upsert({
            where: { id: item.id },
            update: {},
            create: {
                id: item.id,
                showId: item.showId,
                currentEpisode: item.currentEpisode,
                status: statusMap[item.status],
            },
        });
    }
    console.log('WatchProgress seed completed.');
};