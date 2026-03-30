import React from "react";
import { MyShowsList } from "../../components/myshows/MyShows";
import { useMyShows } from "../../hooks/useMyShows";

export const MyShowsPage: React.FC = () => {
  const { myShows, setRating, toggleFavourite } = useMyShows();

  return (
    <div>
      <h1>My Shows</h1>
      <MyShowsList
        myShows={myShows}
        onRatingChange={setRating}
        onToggleFavourite={toggleFavourite}
      />
    </div>
  );
};
