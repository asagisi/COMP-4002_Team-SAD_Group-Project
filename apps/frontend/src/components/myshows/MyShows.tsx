import React from "react";
import type { MyShow } from "../../../../../shared/types/MyShowsType";
import "./MyShows.css";

type ShowProps = {
  myShows: MyShow[];
  onRatingChange: (showId: number, value: number) => void;
  onToggleFavourite: (showId: number) => void;
};

export const MyShowsList: React.FC<ShowProps> = ({
  myShows,
  onRatingChange,
  onToggleFavourite,
}) => {
  const stars = (n: number) => "⭐".repeat(n);

  return (
    <section className="my-shows-list">
      {myShows.length === 0 ? (
        <p>No shows yet.</p>
      ) : (
        <ul>
          {myShows.map((show) => (
            <li
              key={show.id}
              className={show.isFavourite ? "favourite" : undefined}
            >
              <strong>{show.title}</strong>

              <span
                className="my-shows-stars"
                aria-label={`${show.rating} out of 5 stars`}
              >
                {stars(show.rating)}
              </span>

              <div className="my-shows-rating-controls">
                <label htmlFor={`rating-${show.id}`}>Rating: </label>
                <select
                  id={`rating-${show.id}`}
                  value={show.rating}
                  onChange={(e) =>
                    onRatingChange(show.id, Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => onToggleFavourite(show.id)}
                  aria-pressed={show.isFavourite}
                >
                  {show.isFavourite ? "★" : "☆"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
