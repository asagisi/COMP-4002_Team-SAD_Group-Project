import { Router, Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import {
  deleteShowProgress,
  getCurrentFavouriteShow,
  getShows,
  patchCurrentFavouriteShow,
  patchShowHidden,
  patchShowPreferences,
  patchShowProgress,
} from "../controllers/showController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import { validateHiddenPayload, validatePreferencesPayload, validateProgressPayload, validateShowIdParam } from "../middleware/showValidation";

const router = Router();

// Returns 401 JSON for unauthenticated requests (instead of Clerk's default redirect, causing a 404 and leading to to the wrong error message).
function requireSignedIn(req: Request, res: Response, next: NextFunction): void {
  if (!getAuth(req).userId) {
    res.status(401).json({ error: "Please sign in to make changes." });
    return;
  }
  next();
}

router.get("/", findOrCreateUser, getShows);
router.get("/current-favourite", findOrCreateUser, getCurrentFavouriteShow);
router.patch("/current-favourite/:showId", requireSignedIn, findOrCreateUser, validateShowIdParam, patchCurrentFavouriteShow);

router.patch("/:showId/hidden", requireSignedIn, findOrCreateUser, validateShowIdParam, validateHiddenPayload, patchShowHidden);
router.patch("/:showId/preferences", requireSignedIn, findOrCreateUser, validateShowIdParam, validatePreferencesPayload, patchShowPreferences);
router.patch("/:showId/progress", requireSignedIn, findOrCreateUser, validateShowIdParam, validateProgressPayload, patchShowProgress);
router.delete("/:showId/progress", requireSignedIn, findOrCreateUser, validateShowIdParam, deleteShowProgress);

export default router;
