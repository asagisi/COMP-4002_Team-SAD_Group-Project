import React from "react";
import { MyShowsList } from "../../components/myshows/MyShows";
import { useMyShows } from "../../hooks/useMyShows";

export const MyShowsPage: React.FC = () => {
  const { myShows, loading, error, setRating, toggleFavourite } = useMyShows();

  return (
    <div>
      <h1>My Shows</h1>
      {loading && <p>Loading My Shows...</p>}
      {error && <p>{error}</p>}
      <MyShowsList
        myShows={myShows}
        onRatingChange={setRating}
        onToggleFavourite={toggleFavourite}
      />
    </div>
  );
};
