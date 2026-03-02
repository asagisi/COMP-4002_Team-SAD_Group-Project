export type WatchProgress = {
  id: number;
  title: string;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons: number;
  status: "Not Started" | "Watching" | "Finished";
};
