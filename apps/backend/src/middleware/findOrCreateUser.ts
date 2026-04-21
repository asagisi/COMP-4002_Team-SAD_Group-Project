import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import prisma from "../db/prisma";

/**
 * Looks up or creates the application User that matches the Clerk session.
 */
export async function findOrCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId: clerkUserId } = getAuth(req);

  if (!clerkUserId) {
    next();
    return;
  }

  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {},
      create: { clerkUserId },
    });

    res.locals.userId = user.id;
    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to resolve user";
    res.status(500).json({ error: message });
  }
}
