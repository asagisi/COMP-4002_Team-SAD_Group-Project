import { Request, Response } from "express";
import { WatchStatus } from "@prisma/client";
import { clearWatchProgress, getShowsForUser, updateShowHidden, updateShowPreferences, updateWatchProgress } from "../services/showService";

export async function getShows(req: Request, res: Response): Promise<void> {
  const userId: number | undefined = res.locals.userId;

  try {
    const data = await getShowsForUser(userId);
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch shows";
    res.status(500).json({ error: message });
  }
}

export async function patchShowHidden(req: Request, res: Response): Promise<void> {
  const userId: number = res.locals.userId;
  const showId = Number(req.params.showId);
  const { isHidden } = req.body as { isHidden: boolean };

  try {
    const data = await updateShowHidden(userId, showId, isHidden);
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update show hidden state";
    const status = message === "Show not found" ? 404 : 500;
    res.status(status).json({ error: message });
  }
}

export async function patchShowPreferences(req: Request, res: Response): Promise<void> {
  const userId: number = res.locals.userId;
  const showId = Number(req.params.showId);
  const { rating, isFavourite } = req.body as { rating?: number; isFavourite?: boolean };

  try {
    const data = await updateShowPreferences(userId, showId, { rating, isFavourite });
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update show preferences";
    const status = message === "Show not found" ? 404 : 500;
    res.status(status).json({ error: message });
  }
}

export async function patchShowProgress(req: Request, res: Response): Promise<void> {
  const userId: number = res.locals.userId;
  const showId = Number(req.params.showId);
  const { currentEpisode, totalEpisodes, status } = req.body as {
    currentEpisode: number;
    totalEpisodes: number;
    status: WatchStatus;
  };

  try {
    const data = await updateWatchProgress(userId, showId, {
      currentEpisode,
      totalEpisodes,
      status,
    });
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update watch progress";
    const statusCode = message === "Show not found" ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
}

export async function deleteShowProgress(req: Request, res: Response): Promise<void> {
  const userId: number = res.locals.userId;
  const showId = Number(req.params.showId);

  try {
    const data = await clearWatchProgress(userId, showId);
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to clear watch progress";
    const statusCode = message === "Show not found" ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
}
