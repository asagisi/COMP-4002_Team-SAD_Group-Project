import React from "react";
import "./WatchProgress.css";
import type { WatchProgress as WatchProgressType } from "../types/WatchProgressType";
import { WatchProgress as WatchProgressList } from "../data/WatchProgressList";

export const WatchProgress: React.FC = () => {
  const statusClass: Record<WatchProgressType["status"], string> = {
    "Not Started": "status-not-started",
    "Watching": "status-watching",
    "Finished": "status-finished",
  };

  return (
    <section className="watch-progress">
      <h2>My Watch Progress</h2>
      <ul>
        {WatchProgressList.map(item => (
          <li
            key={item.id}
            className={statusClass[item.status]}
          >
            {item.title} – {item.status}{" "}
            (S{item.currentSeason}:Ep{item.currentEpisode}/S{item.totalSeasons})
          </li>
        ))}
      </ul>
    </section>
  );
};