import React from "react";
import { WatchProgress } from "../data/WatchProgressList";
import "./MyShows.css";

export const MyShowsList: React.FC = () => {
  const completedShows = WatchProgress.filter(
    show => show.status === "Finished"
  );

  return (
    <section className="my-shows-list">

      {completedShows.length === 0 ? (
        <p>No completed shows yet.</p>
      ) : (
        <ul>
          {completedShows.map(show => (
            <li key={show.id}>
              <strong>{show.title}</strong>

              <div>
                <label>
                  Rating: 
                  <select defaultValue={5}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </label>

                <button>Make Favorite</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};