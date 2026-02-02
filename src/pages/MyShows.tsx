import React, { useState } from "react";
import { MyShowsList } from "../components/myshows/MyShows";

export const MyShowsPage: React.FC = () => {
  const [ratings, setRatings] = useState<Record<number, number>>({});

  return (
    <main className="my-shows-page">
      <header>
        <h1>My Shows</h1>
      </header>

      <MyShowsList ratings={ratings} setRatings={setRatings}/>
    </main>
  );
};
