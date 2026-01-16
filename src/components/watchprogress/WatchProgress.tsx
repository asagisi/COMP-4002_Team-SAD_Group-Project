import React from 'react';

type WatchProgress = {
  id: number;
  title: string;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons: number;
  status: "Not Started" | "Watching" | "Finished";
};

export const WatchProgress: React.FC = () => {   
    const progress = [
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

    const statusClass = {
        "Not Started": "status-not-started",
        "Watching": "status-watching",
        "Finished": "status-finished",
    };

    return (
        <section className="watch-progress">
            <h2>My Watch Progress</h2>
            <ul>
                {progress.map(progress => (
                    <li key={progress.id} className={statusClass[progress.status]}>
                        {progress.title} - {progress.status} (S{progress.currentSeason}:Ep{progress.currentEpisode}/S{progress.totalSeasons})
                    </li>
                ))}
            </ul>
        </section>
    );
};