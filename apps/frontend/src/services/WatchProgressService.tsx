import type { WatchProgress } from "../components/types/WatchProgressType";
import WatchProgressRepo from "../repos/WatchProgressRepo";
import { shows } from "../components/data/shows";
import { isShowHidden } from "../repositories/userShowPrefsRepo";

type ServiceResult = {
  success: boolean;
  data?: WatchProgress;
  errorMessages?: string[];
};

const getAllWatchProgress = (): WatchProgress[] => {
  return WatchProgressRepo.getAllWatchProgress().filter((progress) => !isShowHidden(progress.showId));
};

const createWatchProgress = (progress: WatchProgress): ServiceResult => {
  const errorMessages: string[] = [];

  if (!progress.title || !progress.title.trim()) {
    errorMessages.push("Show title is required.");
  } else {
    const existsInShows = shows.some(show => show.title === progress.title && !isShowHidden(show.id));
    if (!existsInShows) {
      errorMessages.push("Show is not found in the list.");
    }
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
  if (progress.currentEpisode < 1) {
    errorMessages.push("Please add currently watched episode.");
  }
  const allowedStatuses = ["Not Started", "Watching", "Finished"] as const;
  if (!allowedStatuses.includes(progress.status)) {
    errorMessages.push("Please set status.");
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

const deleteWatchProgress = (id: number): boolean => {
  return WatchProgressRepo.removeWatchProgress(id);
};

export default {
  getAllWatchProgress,
  createWatchProgress,
  updateWatchProgress,
  deleteWatchProgress
};