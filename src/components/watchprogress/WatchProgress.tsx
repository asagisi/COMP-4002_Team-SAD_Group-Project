import { useState, useEffect } from "react";
import WatchProgressService from "../../services/WatchProgressService";
import useFormInput from "../../hooks/useFormInput";

export const useWatchProgress = () => {
  const [progress, setProgress] = useState(WatchProgressService.getAllWatchProgress());
  const [error, setError] = useState("");
  const titleInput = useFormInput("");

  useEffect(() => {
    setProgress(WatchProgressService.getAllWatchProgress());
  }, []);

  const addProgress = () => {
    const result = WatchProgressService.createWatchProgress({
      id: Date.now(),
      showId: Date.now(),
      title: titleInput.inputValue,
      currentEpisode: 1,
      totalEpisodes: 100,
      status: "Not Started",
    });

    if (!result.success) {
      setError(result.errorMessages?.join(", ") || "Unknown error");
      return;
    }

    setProgress(prev => [...prev, result.data!]);
    setError("");
    titleInput.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  const updateProgress = (item: any) => {
    const result = WatchProgressService.updateWatchProgress(item);

    if (!result.success) {
      setError(result.errorMessages?.join(", ") || "Unknown error");
      return;
    }

    setProgress(prev =>
      prev.map(prev => (prev.id === item.id ? result.data! : p))
    );
    setError("");
  };

  const deleteProgress = (id: number) => {
    setProgress(prev => prev.filter(item => item.id !== id));
  };

  return {
    progress,
    error,
    titleInput,
    addProgress,
    updateProgress,
    deleteProgress
  };
};