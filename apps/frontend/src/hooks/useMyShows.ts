import { useState, useEffect, useCallback } from "react";
import * as MyShowsService from "../services/MyShowsService";
import type { MyShow } from "../components/types/MyShowsType";

export function useMyShows() {
  const [myShows, setMyShows] = useState<MyShow[]>([]);

  useEffect(() => {
    MyShowsService.fetchMyShows().then(setMyShows);
  }, []);

  const setRating = useCallback(async (showId: number, value: number) => {
    await MyShowsService.updateShowRating(showId, value);
    const next = await MyShowsService.fetchMyShows();
    setMyShows([...next]);
  }, []);

  const toggleFavourite = useCallback(async (showId: number) => {
    await MyShowsService.toggleFavouriteShow(showId);
    const next = await MyShowsService.fetchMyShows();
    setMyShows([...next]);
  }, []);

  return { myShows, setRating, toggleFavourite };
}
