export type WatchProgress = {
  id: number;
  title: string;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons: number;
  status: "Not Started" | "Watching" | "Finished";
};

// need to use title from shows.tsx for title in WatchProgressType.tsx
// affected files:
// WatchProgress.tsx
// WatchProgressAdd.tsx
// WatchProgressEdit.tsx
// WatchProgressDelete.tsx
// WatchProgressList.tsx
// MyShows.tsx