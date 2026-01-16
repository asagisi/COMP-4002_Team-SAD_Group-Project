import React from 'react';

type WatchProgress = {
  id: number;
  title: string;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons: number;
  status: "Not Started" | "Watching" | "Finished";
};
