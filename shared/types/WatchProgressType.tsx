export type WatchProgress = {
  id: number;
  showId: number;
  currentEpisode: number;
  status: "Not Started" | "Watching" | "Finished";
};