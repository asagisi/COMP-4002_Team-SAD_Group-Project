export type WatchProgress = {
  id: number;
  title: string;
  showId: number;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons: number;
  status: "Not Started" | "Watching" | "Finished";
};