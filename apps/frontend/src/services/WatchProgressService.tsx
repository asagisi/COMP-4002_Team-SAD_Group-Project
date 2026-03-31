import type { WatchProgress } from "../components/types/WatchProgressType";
import { showRepository, type ApiWatchStatus, type ShowWithPrefs } from "../repositories/showRepository";

type ServiceResult = {
  success: boolean;
  data?: WatchProgress;
  errorMessages?: string[];
};

const toUiStatus = (status: ApiWatchStatus): WatchProgress["status"] => {
  if (status === "WATCHING") {
    return "Watching";
  }

  if (status === "FINISHED") {
    return "Finished";
  }

  return "Not Started";
};

const toApiStatus = (status: WatchProgress["status"]): ApiWatchStatus => {
  if (status === "Watching") {
    return "WATCHING";
  }

  if (status === "Finished") {
    return "FINISHED";
  }

  return "NOT_STARTED";
};

const toWatchProgress = (row: ShowWithPrefs): WatchProgress => ({
  id: row.id,
  showId: row.id,
  title: row.title,
  currentEpisode: row.currentEpisode,
  totalEpisodes: row.totalEpisodes,
  status: toUiStatus(row.status),
});

const getAllWatchProgress = async (): Promise<WatchProgress[]> => {
  const rows = await showRepository.getAllShowsFromApi();

  return rows
    .filter((row) => !row.isHidden)
    .filter((row) => row.totalEpisodes > 0)
    .map(toWatchProgress);
};

const createWatchProgress = async (progress: WatchProgress): Promise<ServiceResult> => {
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

  const created = await showRepository.setWatchProgress(progress.showId, {
    currentEpisode: progress.currentEpisode,
    totalEpisodes: progress.totalEpisodes,
    status: toApiStatus(progress.status),
  });

  return { success: true, data: toWatchProgress(created) };
};

const updateWatchProgress = async (progress: WatchProgress): Promise<ServiceResult> => {
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

  const updated = await showRepository.setWatchProgress(progress.showId, {
    currentEpisode: progress.currentEpisode,
    totalEpisodes: progress.totalEpisodes,
    status: toApiStatus(progress.status),
  });

  return { success: true, data: toWatchProgress(updated) };
};

const deleteWatchProgress = async (showId: number): Promise<boolean> => {
  await showRepository.clearWatchProgress(showId);
  return true;
};

export default {
  getAllWatchProgress,
  createWatchProgress,
  updateWatchProgress,
  deleteWatchProgress,
};
