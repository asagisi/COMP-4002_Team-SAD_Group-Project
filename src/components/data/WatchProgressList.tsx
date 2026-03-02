import type { WatchProgress as WatchProgressType} from "../types/WatchProgressType";

export const WatchProgress: WatchProgressType[] = [
  {
    id: 1,
    title: "South Park",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 28,
    status: "Not Started",
  },
  {
    id: 2,
    title: "Dr. House",
    currentSeason: 4,
    currentEpisode: 9,
    totalSeasons: 8,
    status: "Watching",
  },
  {
    id: 3,
    title: "Dragon Ball Z",
    currentSeason: 9,
    currentEpisode: 38,
    totalSeasons: 9,
    status: "Finished",
  },
];
