import prisma from "../db/prisma";
import { WatchStatus } from "@prisma/client";

type ShowListItem = {
  id: number;
  title: string;
  genre: string;
  year: number;
  isHidden: boolean;
  isFavourite: boolean;
  rating: number | null;
  currentEpisode: number;
  totalEpisodes: number;
  status: WatchStatus;
};

export async function getShowsForUser(userId?: number): Promise<ShowListItem[]> {
  const rows = await prisma.show.findMany({
    include: {
      userShow: userId
        ? {
            where: { userId },
            select: {
              isHidden: true,
              isFavourite: true,
              rating: true,
              currentEpisode: true,
              totalEpisodes: true,
              status: true,
            },
          }
        : false,
    },
    orderBy: {
      title: "asc",
    },
  });

  return rows.map((show) => {
    const rel = Array.isArray(show.userShow) ? show.userShow[0] : undefined;
    return {
      id: show.id,
      title: show.title,
      genre: show.genre,
      year: show.year,
      isHidden: rel?.isHidden ?? false,
      isFavourite: rel?.isFavourite ?? false,
      rating: rel?.rating ?? null,
      currentEpisode: rel?.currentEpisode ?? 0,
      totalEpisodes: rel?.totalEpisodes ?? 0,
      status: rel?.status ?? WatchStatus.NOT_STARTED,
    };
  });
}

export async function updateShowHidden(userId: number, showId: number, isHidden: boolean): Promise<ShowListItem> {
  const show = await prisma.show.findUnique({ where: { id: showId } });
  if (!show) {
    throw new Error("Show not found");
  }

  const updated = await prisma.userShow.upsert({
    where: {
      userId_showId: {
        userId,
        showId,
      },
    },
    update: {
      isHidden,
    },
    create: {
      userId,
      showId,
      isHidden,
    },
  });

  return {
    id: show.id,
    title: show.title,
    genre: show.genre,
    year: show.year,
    isHidden: updated.isHidden,
    isFavourite: updated.isFavourite,
    rating: updated.rating,
    currentEpisode: updated.currentEpisode,
    totalEpisodes: updated.totalEpisodes,
    status: updated.status,
  };
}

export async function updateShowPreferences(
  userId: number,
  showId: number,
  payload: { rating?: number; isFavourite?: boolean }
): Promise<ShowListItem> {
  const show = await prisma.show.findUnique({ where: { id: showId } });
  if (!show) {
    throw new Error("Show not found");
  }

  const updated = await prisma.userShow.upsert({
    where: {
      userId_showId: {
        userId,
        showId,
      },
    },
    update: {
      ...(payload.rating !== undefined ? { rating: payload.rating } : {}),
      ...(payload.isFavourite !== undefined ? { isFavourite: payload.isFavourite } : {}),
    },
    create: {
      userId,
      showId,
      rating: payload.rating ?? null,
      isFavourite: payload.isFavourite ?? false,
    },
  });

  return {
    id: show.id,
    title: show.title,
    genre: show.genre,
    year: show.year,
    isHidden: updated.isHidden,
    isFavourite: updated.isFavourite,
    rating: updated.rating,
    currentEpisode: updated.currentEpisode,
    totalEpisodes: updated.totalEpisodes,
    status: updated.status,
  };
}

export async function updateWatchProgress(
  userId: number,
  showId: number,
  payload: { currentEpisode: number; totalEpisodes: number; status: WatchStatus }
): Promise<ShowListItem> {
  const show = await prisma.show.findUnique({ where: { id: showId } });
  if (!show) {
    throw new Error("Show not found");
  }

  const updated = await prisma.userShow.upsert({
    where: {
      userId_showId: {
        userId,
        showId,
      },
    },
    update: {
      currentEpisode: payload.currentEpisode,
      totalEpisodes: payload.totalEpisodes,
      status: payload.status,
    },
    create: {
      userId,
      showId,
      currentEpisode: payload.currentEpisode,
      totalEpisodes: payload.totalEpisodes,
      status: payload.status,
    },
  });

  return {
    id: show.id,
    title: show.title,
    genre: show.genre,
    year: show.year,
    isHidden: updated.isHidden,
    isFavourite: updated.isFavourite,
    rating: updated.rating,
    currentEpisode: updated.currentEpisode,
    totalEpisodes: updated.totalEpisodes,
    status: updated.status,
  };
}

export async function clearWatchProgress(userId: number, showId: number): Promise<ShowListItem> {
  const show = await prisma.show.findUnique({ where: { id: showId } });
  if (!show) {
    throw new Error("Show not found");
  }

  const updated = await prisma.userShow.upsert({
    where: {
      userId_showId: {
        userId,
        showId,
      },
    },
    update: {
      currentEpisode: 0,
      totalEpisodes: 0,
      status: WatchStatus.NOT_STARTED,
    },
    create: {
      userId,
      showId,
      currentEpisode: 0,
      totalEpisodes: 0,
      status: WatchStatus.NOT_STARTED,
    },
  });

  return {
    id: show.id,
    title: show.title,
    genre: show.genre,
    year: show.year,
    isHidden: updated.isHidden,
    isFavourite: updated.isFavourite,
    rating: updated.rating,
    currentEpisode: updated.currentEpisode,
    totalEpisodes: updated.totalEpisodes,
    status: updated.status,
  };
}
