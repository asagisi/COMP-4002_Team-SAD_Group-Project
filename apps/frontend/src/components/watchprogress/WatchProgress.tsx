import { useState, useEffect, useRef } from "react";
import WatchProgressService from "../../services/WatchProgressService";
import useFormInput from "../../hooks/useFormInput";
import { showRepository, type ShowWithPrefs } from "../../repositories/showRepository";
import type { WatchProgress } from "../types/WatchProgressType";

export const useWatchProgress = () => {
  const toUiStatus = (status: ShowWithPrefs["status"]): WatchProgress["status"] => {
    if (status === "WATCHING") {
      return "Watching";
    }

    if (status === "FINISHED") {
      return "Finished";
    }

    return "Not Started";
  };

  const initialCatalog = showRepository.getCachedShows();
  
  const initialProgress = initialCatalog
    .filter((row) => !row.isHidden)
    .filter((row) => row.totalEpisodes > 0)
    .map((row) => ({
      id: row.id,
      showId: row.id,
      title: row.title,
      currentEpisode: row.currentEpisode,
      totalEpisodes: row.totalEpisodes,
      status: toUiStatus(row.status),
    }));

  const [progress, setProgress] = useState<WatchProgress[]>(initialProgress);
  const [loading, setLoading] = useState(initialCatalog.length === 0);
  const [catalogShows, setCatalogShows] = useState<ShowWithPrefs[]>(initialCatalog);
  const [catalogReady, setCatalogReady] = useState(initialCatalog.length > 0);
  const [error, setError] = useState("");
  const titleInput = useFormInput("");
  const query = titleInput.inputValue.trim().toLowerCase();
  const pendingByShowId = useRef<Record<number, WatchProgress>>({});
  const timerByShowId = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const availableShows = catalogShows
    .filter((show) => !show.isHidden)
    .filter((show) => !progress.some((item) => item.showId === show.id))
    .filter((show) => (query ? show.title.toLowerCase().includes(query) : true));

  useEffect(() => {
    const loadAll = async () => {
      try {
        const data = await showRepository.getAllShowsFromApi();
        setCatalogShows(data);
        setCatalogReady(true);

        const progressRows = data
          .filter((row) => !row.isHidden)
          .filter((row) => row.totalEpisodes > 0)
          .map((row) => ({
            id: row.id,
            showId: row.id,
            title: row.title,
            currentEpisode: row.currentEpisode,
            totalEpisodes: row.totalEpisodes,
            status: toUiStatus(row.status),
          }));

        setProgress(progressRows);
        setError("");
      } catch {
        setCatalogReady(false);
        setError("Failed to load watch progress.");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const addProgress = async () => {
    if (!catalogReady) {
      setError("Shows are still syncing. Try again in a moment.");
      return;
    }

    const selectedShow = catalogShows.find(
      (show) => show.title.toLowerCase() === titleInput.inputValue.trim().toLowerCase()
    );

    if (!selectedShow || selectedShow.isHidden) {
      setError("Choose a show from the search results.");
      return;
    }

    const optimisticItem: WatchProgress = {
      id: selectedShow.id,
      showId: selectedShow.id,
      title: selectedShow.title,
      currentEpisode: 1,
      totalEpisodes: 100,
      status: "Not Started",
    };

    const previous = progress;
    setProgress((prev) => {
      const exists = prev.some((item) => item.showId === selectedShow.id);
      if (exists) {
        return prev.map((item) => (item.showId === selectedShow.id ? optimisticItem : item));
      }

      return [...prev, optimisticItem];
    });
    setError("");
    titleInput.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);

    try {
      const result = await WatchProgressService.createWatchProgress(optimisticItem);
      if (!result.success) {
        setProgress(previous);
        setError(result.errorMessages?.join(", ") || "Unknown error");
        return;
      }

      setProgress((prev) =>
        prev.map((item) => (item.showId === selectedShow.id ? result.data! : item))
      );
    } catch (err) {
      setProgress(previous);
      const message = err instanceof Error ? err.message : "Failed to add show.";
      setError(message);
    }
  };

  const addProgressByShowId = async (showId: number) => {
    if (!catalogReady) {
      setError("Shows are still syncing. Try again in a moment.");
      return;
    }

    const selectedShow = catalogShows.find((show) => show.id === showId);
    if (!selectedShow || selectedShow.isHidden) {
      setError("Choose a show from the search results.");
      return;
    }

    const optimisticItem: WatchProgress = {
      id: selectedShow.id,
      showId: selectedShow.id,
      title: selectedShow.title,
      currentEpisode: 1,
      totalEpisodes: 100,
      status: "Not Started",
    };

    const previous = progress;
    setProgress((prev) => {
      const exists = prev.some((item) => item.showId === selectedShow.id);
      if (exists) {
        return prev.map((item) => (item.showId === selectedShow.id ? optimisticItem : item));
      }

      return [...prev, optimisticItem];
    });
    setError("");
    titleInput.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);

    try {
      const result = await WatchProgressService.createWatchProgress(optimisticItem);
      if (!result.success) {
        setProgress(previous);
        setError(result.errorMessages?.join(", ") || "Unknown error");
        return;
      }

      setProgress((prev) =>
        prev.map((item) => (item.showId === selectedShow.id ? result.data! : item))
      );
    } catch (err) {
      setProgress(previous);
      const message = err instanceof Error ? err.message : "Failed to add show.";
      setError(message);
    }
  };

  const updateProgress = async (item: WatchProgress) => {
    const previous = progress;
    setProgress((prev) => prev.map((current) => (current.showId === item.showId ? item : current)));
    pendingByShowId.current[item.showId] = item;

    if (timerByShowId.current[item.showId]) {
      clearTimeout(timerByShowId.current[item.showId]);
    }

    timerByShowId.current[item.showId] = setTimeout(async () => {
      const latest = pendingByShowId.current[item.showId];
      if (!latest) {
        return;
      }

      const result = await WatchProgressService.updateWatchProgress(latest);

      if (!result.success) {
        setProgress(previous);
        setError(result.errorMessages?.join(", ") || "Unknown error");
        delete pendingByShowId.current[item.showId];
        delete timerByShowId.current[item.showId];
        return;
      }

      setProgress((prev) => prev.map((current) => (current.showId === item.showId ? result.data! : current)));
      setError("");
      delete pendingByShowId.current[item.showId];
      delete timerByShowId.current[item.showId];
    }, 220);
  };

  const deleteProgress = async (showId: number) => {
    await WatchProgressService.deleteWatchProgress(showId);
    setProgress((prev) => prev.filter((item) => item.showId !== showId));
  };

  return {
    progress,
    loading,
    catalogReady,
    availableShows,
    error,
    titleInput,
    addProgress,
    addProgressByShowId,
    updateProgress,
    deleteProgress,
  };
};
