export type WatchProgress = {
  id: number;
  title: string;
  showId: number;
  currentEpisode: number;
  totalEpisodes: number;
  status: "Not Started" | "Watching" | "Finished";
};