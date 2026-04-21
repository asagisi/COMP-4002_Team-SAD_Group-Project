import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { deleteShowProgress, getShows, patchShowHidden, patchShowPreferences, patchShowProgress } from "../controllers/showController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import { validateHiddenPayload, validatePreferencesPayload, validateProgressPayload, validateShowIdParam } from "../middleware/showValidation";

const router = Router();

router.get("/", findOrCreateUser, getShows);

router.patch("/:showId/hidden", requireAuth(), findOrCreateUser, validateShowIdParam, validateHiddenPayload, patchShowHidden);
router.patch("/:showId/preferences", requireAuth(), findOrCreateUser, validateShowIdParam, validatePreferencesPayload, patchShowPreferences);
router.patch("/:showId/progress", requireAuth(), findOrCreateUser, validateShowIdParam, validateProgressPayload, patchShowProgress);
router.delete("/:showId/progress", requireAuth(), findOrCreateUser, validateShowIdParam, deleteShowProgress);

export default router;
