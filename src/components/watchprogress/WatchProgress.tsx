import React, { useState } from "react";
import "./WatchProgress.css";
import type { WatchProgress as WatchProgressType } from "../types/WatchProgressType";
import { WatchProgressAdd } from "./WatchProgressAdd";
import { WatchProgressEdit } from "./WatchProgressEdit";
import { WatchProgressDelete } from "./WatchProgressDelete";
import { WatchProgress as WatchProgressList } from "../data/WatchProgressList";

export const WatchProgress: React.FC = () => {
  const [progress, setProgress] = useState<WatchProgressType[]>(WatchProgressList);
  const [editId, setEditId] = useState<number | null>(null);

  const statusClass: Record<WatchProgressType["status"], string> = {
    "Not Started": "status-not-started",
    "Watching": "status-watching",
    "Finished": "status-finished",
  };

  const handleSave = (update: WatchProgressType) => {
    setProgress(prev =>
      prev.map(item => (item.id === update.id ? update : item))
    );
    setEditId(null);
  };

  const handleDelete = (id: number) => {
    setProgress(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section className="watch-progress">
      <h2>My Watch Progress</h2>

      <section className="add-show">
        <WatchProgressAdd progress={progress} setProgress={setProgress} />
      </section>

      <section className="watch-list">
        <ul>
          {progress.map(item =>
            editId === item.id ? (
              <WatchProgressEdit
                key={item.id}
                item={item}
                onSave={handleSave}
                onCancel={() => setEditId(null)}
              />
            ) : (
              <li key={item.id} className={statusClass[item.status]}>
                <span>
                  {item.title} – {item.status}
                  {item.status !== "Not Started" && (
                    <>
                      {" "}
                      (S{item.currentSeason}:Ep{item.currentEpisode}/S
                      {item.totalSeasons})
                    </>
                  )}
                </span>
                <div>
                  <button onClick={() => setEditId(item.id)}>Edit</button>

                  <WatchProgressDelete
                    title={item.title}
                    onDelete={() => handleDelete(item.id)}
                  />
                </div>
              </li>
            )
          )}
        </ul>
      </section>
    </section>
  );
};