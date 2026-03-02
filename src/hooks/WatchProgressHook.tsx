import { useState, useEffect } from "react";
import type { WatchProgress } from "../components/types/WatchProgressType";
import WatchProgressService from "../services/WatchProgressService";

type HookResult = {
  progress: WatchProgress[];
  error: string;
  addProgress: (title: string) => void;
  updateProgress: (item: WatchProgress) => void;
  deleteProgress: (id: number) => void;
};

export const useWatchProgress = (): HookResult => {
  const [progress, setProgress] = useState<WatchProgress[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const allProgress = WatchProgressService.getAllWatchProgress();
    setProgress(allProgress);
  }, []);

  const addProgress = (title: string) => {
    const newItem: WatchProgress = {
      id: Date.now(),
      showId: Date.now(),
      title,
      currentEpisode: 1,
      totalEpisodes: 100,
      status: "Not Started",
    };

    const result = WatchProgressService.createWatchProgress(newItem);

    if (!result.success) {
      setError(result.errorMessages?.join(", ") || "Unknown error");
      return;
    }

    setProgress(watchList => [...watchList, result.data!]);
    setError("");
  };

  const updateProgress = (item: WatchProgress) => {
    const result = WatchProgressService.updateWatchProgress(item);

    if (!result.success) {
      setError(result.errorMessages?.join(", ") || "Unknown error");
      return;
    }

    setProgress(watchList =>
      watchList.map(currentProgress =>
        currentProgress.id === item.id ? result.data! : currentProgress
      )
    );
    setError("");
  };

  const deleteProgress = (id: number) => {
    const deleted = WatchProgressService.deleteWatchProgress(id);

    if (!deleted) {
      setError("Progress not found.");
      return;
    }

    setProgress(watchList => watchList.filter(currentProgress => currentProgress.id !== id));
    setError("");
  };

  return { progress, error, addProgress, updateProgress, deleteProgress };
};