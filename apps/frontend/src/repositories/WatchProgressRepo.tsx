import type { WatchProgress } from "../../../../shared/types/WatchProgressType";

let progressData: WatchProgress[] = [];

const getAllWatchProgress = (): WatchProgress[] => {
  return progressData.map(progress => ({
    ...progress 
  }));
};

const createWatchProgress = (
  progress: Omit<WatchProgress, "id">
): WatchProgress => {
  const newProgress: WatchProgress = {
    ...progress,
    id: progressData.length ? Math.max(...progressData.map(currentProgress => currentProgress.id)) + 1 : 1,
  };
  progressData.push(newProgress);
  return { ...newProgress };
};

const updateWatchProgress = (
  updatedProgress: WatchProgress
): WatchProgress | null => {
  const index = progressData.findIndex(currentProgress => currentProgress.id === updatedProgress.id);
  if (index === -1) return null;

  progressData[index] = { ...updatedProgress };
  return { ...updatedProgress };
};

const removeWatchProgress = (
  id: number
): boolean => {
  const originalLength = progressData.length;
  progressData = progressData.filter(currentProgress => currentProgress.id !== id);
  return progressData.length < originalLength;
};

export default {
  getAllWatchProgress,
  createWatchProgress,
  updateWatchProgress,
  removeWatchProgress
};