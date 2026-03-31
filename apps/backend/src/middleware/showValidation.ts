import { NextFunction, Request, Response } from "express";
import { WatchStatus } from "@prisma/client";

export function validateUserIdQuery(req: Request, res: Response, next: NextFunction): void {
  const userId = Number(req.query.userId);

  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(400).json({ error: "userId query parameter is required and must be a positive integer." });
    return;
  }

  next();
}

export function validateShowIdParam(req: Request, res: Response, next: NextFunction): void {
  const showId = Number(req.params.showId);

  if (!Number.isInteger(showId) || showId <= 0) {
    res.status(400).json({ error: "showId parameter must be a positive integer." });
    return;
  }

  next();
}

export function validateHiddenPayload(req: Request, res: Response, next: NextFunction): void {
  const { userId, isHidden } = req.body as { userId?: unknown; isHidden?: unknown };

  if (!Number.isInteger(userId) || Number(userId) <= 0) {
    res.status(400).json({ error: "userId is required and must be a positive integer." });
    return;
  }

  if (typeof isHidden !== "boolean") {
    res.status(400).json({ error: "isHidden is required and must be a boolean." });
    return;
  }

  next();
}

export function validatePreferencesPayload(req: Request, res: Response, next: NextFunction): void {
  const { userId, rating, isFavourite } = req.body as {
    userId?: unknown;
    rating?: unknown;
    isFavourite?: unknown;
  };

  if (!Number.isInteger(userId) || Number(userId) <= 0) {
    res.status(400).json({ error: "userId is required and must be a positive integer." });
    return;
  }

  if (rating === undefined && isFavourite === undefined) {
    res.status(400).json({ error: "At least one of rating or isFavourite must be provided." });
    return;
  }

  if (rating !== undefined && (!Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5)) {
    res.status(400).json({ error: "rating must be an integer between 1 and 5." });
    return;
  }

  if (isFavourite !== undefined && typeof isFavourite !== "boolean") {
    res.status(400).json({ error: "isFavourite must be a boolean." });
    return;
  }

  next();
}

export function validateProgressPayload(req: Request, res: Response, next: NextFunction): void {
  const { userId, currentEpisode, totalEpisodes, status } = req.body as {
    userId?: unknown;
    currentEpisode?: unknown;
    totalEpisodes?: unknown;
    status?: unknown;
  };

  if (!Number.isInteger(userId) || Number(userId) <= 0) {
    res.status(400).json({ error: "userId is required and must be a positive integer." });
    return;
  }

  if (!Number.isInteger(currentEpisode) || Number(currentEpisode) < 1) {
    res.status(400).json({ error: "currentEpisode must be an integer greater than or equal to 1." });
    return;
  }

  if (!Number.isInteger(totalEpisodes) || Number(totalEpisodes) < 1) {
    res.status(400).json({ error: "totalEpisodes must be an integer greater than or equal to 1." });
    return;
  }

  if (Number(currentEpisode) > Number(totalEpisodes)) {
    res.status(400).json({ error: "currentEpisode cannot be greater than totalEpisodes." });
    return;
  }

  if (typeof status !== "string" || !Object.values(WatchStatus).includes(status as WatchStatus)) {
    res.status(400).json({ error: "status must be one of NOT_STARTED, WATCHING, FINISHED." });
    return;
  }

  next();
}

export function validateUserIdBody(req: Request, res: Response, next: NextFunction): void {
  const { userId } = req.body as { userId?: unknown };

  if (!Number.isInteger(userId) || Number(userId) <= 0) {
    res.status(400).json({ error: "userId is required and must be a positive integer." });
    return;
  }

  next();
}
