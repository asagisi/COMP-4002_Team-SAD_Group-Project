import type { WatchProgress } from "../components/types/WatchProgressType";
import { WatchProgressList as initialWatchProgress } from "../components/data/WatchProgressList";

let progressData: WatchProgress[] = [...initialWatchProgress];

const getAllWatchProgress = (): WatchProgress[] => {
  return progressData;
};

const createWatchProgress = (
  item: WatchProgress
): WatchProgress => {
  progressData.push(item);
  return item;
};

const updateWatchProgress = (
  item: WatchProgress
): WatchProgress | null => {
  const index = progressData.findIndex(watch => watch.id === item.id);
  if (index === -1) return null;

  progressData[index] = item;
  return item;
};

const removeWatchProgress = (
  id: number
): boolean => {
  const originalLength = progressData.length;
  progressData = progressData.filter(watch => watch.id !== id);
  return progressData.length < originalLength;
};

export default {
  getAllWatchProgress,
  createWatchProgress,
  updateWatchProgress,
  removeWatchProgress
};