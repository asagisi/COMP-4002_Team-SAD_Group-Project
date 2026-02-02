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

  const rating = (showId: number) => ratings[showId] ?? 5;
  const stars = (n: number) => "⭐".repeat(n);

  return (
    <section className="my-shows-list">

      {completedShows.length === 0 ? (
        <p>No completed shows yet.</p>
      ) : (
        <ul>
          {completedShows.map(show => (
            <li key={show.id}>
              <strong>{show.title}</strong>

              <span className="my-shows-stars" aria-label={`${rating(show.id)} out of 5 stars`}>
                {stars(rating(show.id))}
              </span>

              <div className="my-shows-rating-controls">
                <label htmlFor={`rating-${show.id}`}>Rating: </label>
                <select
                  id={`rating-${show.id}`}
                  value={rating(show.id)}
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};