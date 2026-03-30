import { useState, useEffect } from "react";
import WatchProgressService from "../../services/WatchProgressService";
import useFormInput from "../../hooks/useFormInput";
import { shows } from "../data/shows";
import { isShowHidden } from "../../repositories/userShowPrefsRepo";

export const useWatchProgress = () => {
  const [progress, setProgress] = useState(WatchProgressService.getAllWatchProgress());
  const [error, setError] = useState("");
  const titleInput = useFormInput("");

  const query = titleInput.inputValue.trim().toLowerCase();
  const availableShows = shows
    .filter((show) => !isShowHidden(show.id))
    .filter((show) => !progress.some((item) => item.showId === show.id))
    .filter((show) => (query ? show.title.toLowerCase().includes(query) : false));

  useEffect(() => {
    setProgress(WatchProgressService.getAllWatchProgress());
  }, []);

  const addProgress = () => {
    const selectedShow = shows.find(
      (show) => show.title.toLowerCase() === titleInput.inputValue.trim().toLowerCase()
    );

    if (!selectedShow || isShowHidden(selectedShow.id)) {
      setError("Choose a show from the search results.");
      return;
    }

    const result = WatchProgressService.createWatchProgress({
      id: Date.now(),
      showId: selectedShow.id,
      title: selectedShow.title,
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

  const addProgressByShowId = (showId: number) => {
    const selectedShow = shows.find((show) => show.id === showId);
    if (!selectedShow) {
      setError("Show is not found in the list.");
      return;
    }

    const result = WatchProgressService.createWatchProgress({
      id: Date.now(),
      showId: selectedShow.id,
      title: selectedShow.title,
      currentEpisode: 1,
      totalEpisodes: 100,
      status: "Not Started",
    });

    if (!result.success) {
      setError(result.errorMessages?.join(", ") || "Unknown error");
      return;
    }

    setProgress((prev) => [...prev, result.data!]);
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
      prev.map(prev => (prev.id === item.id ? result.data! : prev))
    );
    setError("");
  };

  const deleteProgress = (id: number) => {
    WatchProgressService.deleteWatchProgress(id);
    setProgress(prev => prev.filter(item => item.id !== id));
  };

  return {
    progress,
    error,
    titleInput,
    availableShows,
    addProgress,
    addProgressByShowId,
    updateProgress,
    deleteProgress
  };
};