import React from "react";
import { WatchProgress } from "../data/WatchProgressList";
import "./MyShows.css";

type ShowProps = {
  ratings: Record<number, number>;
  setRatings: React.Dispatch<React.SetStateAction<Record<number, number>>>;
};

export const MyShowsList: React.FC<ShowProps> = ({ ratings, setRatings }) => {
  const completedShows = WatchProgress.filter(
    show => show.status === "Finished"
  );

  const handleRatingChange = (showId: number, value: number) => {

    setRatings(prev => ({
      ...prev,
      [showId]: value,
    }));
  };

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
                <label htmlFor={`rating-${show.id}`}>Rating: </label>
                  <select
                  id={`rating-${show.id}`}
                  value={ratings[show.id] ?? 5}
                  onChange={(e) =>
                    handleRatingChange(show.id, Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>

                <p>
                  Current rating: {ratings[show.id] ?? 5}
                </p>
 
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};