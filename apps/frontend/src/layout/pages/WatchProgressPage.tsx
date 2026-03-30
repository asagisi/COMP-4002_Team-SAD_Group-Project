import React, { useState } from "react";
import { useWatchProgress } from "../../components/watchprogress/WatchProgress";
import "../../components/watchprogress/WatchProgress.css";

export const WatchProgressPage: React.FC = () => {
  const { progress, error, titleInput, availableShows, addProgress, addProgressByShowId, updateProgress, deleteProgress } = useWatchProgress();
  const [editId, setEditId] = useState<number | null>(null);

  const statusClass: Record<string, string> = {
    "Not Started": "status-not-started",
    "Watching": "status-watching",
    "Finished": "status-finished",
  };

  return (
    <div className="watch-progress-container">
      <h2>My Watch Progress</h2>

      <div className="add-show">
        <input
          type="text"
          placeholder="Add a show to watchlist"
          value={titleInput.inputValue}
          onChange={titleInput.onChange}
        />
        <button onClick={addProgress}>Add Show</button>
      </div>

      {titleInput.inputValue.trim() && (
        <ul className="watch-list">
          {availableShows.length === 0 ? (
            <li>No matching shows found.</li>
          ) : (
            availableShows.map((show) => (
              <li key={show.id}>
                <span>{show.title}</span>
                <button onClick={() => addProgressByShowId(show.id)}>Add</button>
              </li>
            ))
          )}
        </ul>
      )}

      {error && <div className="error">{error}</div>}

      <ul className="watch-list">
        {progress.map(item =>
          editId === item.id ? (
            <li key={item.id} className={statusClass[item.status]}>
              <strong>{item.title}</strong>
              <div>
                <label>
                  Episode:
                  <input
                    type="number"
                    min={1}
                    max={item.totalEpisodes}
                    value={item.currentEpisode}
                    onChange={e =>
                      updateProgress({ ...item, currentEpisode: Number(e.target.value) })
                    }
                  />
                  / {item.totalEpisodes}
                </label>
              </div>
              <div>
                <label>
                  Status:
                  <select
                    value={item.status}
                    onChange={e =>
                      updateProgress({ ...item, status: e.target.value })
                    }
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Watching">Watching</option>
                    <option value="Finished">Finished</option>
                  </select>
                </label>
              </div>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </li>
          ) : (
            <li key={item.id} className={statusClass[item.status]}>
              <span>
                {item.title} – {item.status}{" "}
                {item.status !== "Not Started" && `(Ep ${item.currentEpisode}/${item.totalEpisodes})`}
              </span>
              <div>
                <button onClick={() => setEditId(item.id)}>Edit</button>
                <button onClick={() => deleteProgress(item.id)}>Delete</button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};