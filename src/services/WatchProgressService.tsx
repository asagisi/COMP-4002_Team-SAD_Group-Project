import type { WatchProgress } from "../components/types/WatchProgressType";
import WatchProgressRepo from "../repos/WatchProgressRepo";
import { shows } from "../components/data/shows";

type ServiceResult = {
  success: boolean;
  data?: WatchProgress;
  errorMessages?: string[];
};

const getAllWatchProgress = (): WatchProgress[] => {
  return WatchProgressRepo.getAllWatchProgress();
};

const createWatchProgress = (progress: WatchProgress): ServiceResult => {
  const errorMessages: string[] = [];
  if (!progress.title || !progress.title.trim()) {
    errorMessages.push("Show title is required.");
  }
  if (progress.currentEpisode < 1) {
    errorMessages.push("Please add the current episode being watched.");
  }
  if (errorMessages.length > 0) {
    return { success: false, errorMessages };
  }

  const created = WatchProgressRepo.createWatchProgress(progress);
  return { success: true, data: created };
};

const updateWatchProgress = (progress: WatchProgress): ServiceResult => {
  const errorMessages: string[] = [];
  if (!progress.title || !progress.title.trim()) {
    errorMessages.push("Show title is required.");
  }
  if (progress.currentEpisode < 1) {
    errorMessages.push("Please add the current episode being watched.");
  }
  if (errorMessages.length > 0) {
    return { success: false, errorMessages };
  }

  const updated = WatchProgressRepo.updateWatchProgress(progress);
  if (!updated) {
    return { success: false, errorMessages: ["Progress not found."] };
  }
  return { success: true, data: updated };
};

const deleteWatchProgress = (id: number): {
  success: boolean;
  errorMessages?: string[]
} => {
  const removed = WatchProgressRepo.removeWatchProgress(id);
  if (!removed) {
    return { success: false, errorMessages: ["Progress not found."] };
  }
  return { success: true };
};

export default {
  getAllWatchProgress,
  createWatchProgress,
  updateWatchProgress,
  deleteWatchProgress
};