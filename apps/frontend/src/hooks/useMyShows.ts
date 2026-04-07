import { useState, useEffect, useCallback, useRef } from "react";
import * as MyShowsService from "../services/MyShowsService";
import type { MyShow } from "../../../../shared/types/MyShowsType";
import { showRepository } from "../repositories/showRepository";

function toMyShowsFromCache(): MyShow[] {
  return showRepository
    .getCachedShows()
    .filter((show) => !show.isHidden)
    .map((show) => ({
      id: show.id,
      title: show.title,
      rating: show.rating ?? 1,
      isFavourite: show.isFavourite,
    }));
}

export function useMyShows() {
  const [myShows, setMyShows] = useState<MyShow[]>(toMyShowsFromCache);
  const [loading, setLoading] = useState(myShows.length === 0);
  const [error, setError] = useState("");
  const inFlightByShowId = useRef<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await MyShowsService.fetchMyShows();
        setMyShows(data);
        setError("");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load My Shows.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const setRating = useCallback(async (showId: number, value: number) => {
    if (inFlightByShowId.current.has(showId)) {
      return;
    }

    inFlightByShowId.current.add(showId);
    const previous = myShows;
    setMyShows((prev) => prev.map((show) => (show.id === showId ? { ...show, rating: value } : show)));

    try {
      const updated = await MyShowsService.updateShowRating(showId, value);
      setMyShows((prev) => prev.map((show) => (show.id === showId ? updated : show)));
      setError("");
    } catch (err) {
      setMyShows(previous);
      const message = err instanceof Error ? err.message : "Failed to update rating.";
      setError(message);
    } finally {
      inFlightByShowId.current.delete(showId);
    }
  }, [myShows]);

  const toggleFavourite = useCallback(async (showId: number) => {
    if (inFlightByShowId.current.has(showId)) {
      return;
    }

    inFlightByShowId.current.add(showId);
    const previous = myShows;
    setMyShows((prev) =>
      prev.map((show) =>
        show.id === showId ? { ...show, isFavourite: !show.isFavourite } : show
      )
    );

    try {
      const updated = await MyShowsService.toggleFavouriteShow(showId);
      setMyShows((prev) => prev.map((show) => (show.id === showId ? updated : show)));
      setError("");
    } catch (err) {
      setMyShows(previous);
      const message = err instanceof Error ? err.message : "Failed to update favourite.";
      setError(message);
    } finally {
      inFlightByShowId.current.delete(showId);
    }
  }, [myShows]);

  return { myShows, loading, error, setRating, toggleFavourite };
}
