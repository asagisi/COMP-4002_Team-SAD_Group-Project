import { Router } from "express";
import { deleteShowProgress, getShows, patchShowHidden, patchShowPreferences, patchShowProgress } from "../controllers/showController";
import { validateHiddenPayload, validatePreferencesPayload, validateProgressPayload, validateShowIdParam, validateUserIdBody, validateUserIdQuery } from "../middleware/showValidation";

const router = Router();

router.get("/", validateUserIdQuery, getShows);
router.patch("/:showId/hidden", validateShowIdParam, validateHiddenPayload, patchShowHidden);
router.patch("/:showId/preferences", validateShowIdParam, validatePreferencesPayload, patchShowPreferences);
router.patch("/:showId/progress", validateShowIdParam, validateProgressPayload, patchShowProgress);
router.delete("/:showId/progress", validateShowIdParam, validateUserIdBody, deleteShowProgress);

export default router;
