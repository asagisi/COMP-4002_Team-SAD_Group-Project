export type WatchProgress = {
  id: number;
  showId: number;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons: number;
  status: "Not Started" | "Watching" | "Finished";
};
