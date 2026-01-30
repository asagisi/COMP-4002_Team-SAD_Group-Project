import React from "react";
import { MyShowsList } from "../components/myshows/MyShows";

export const MyShowsPage: React.FC = () => {
  return (
    <main className="my-shows-page">
      <header>
        <h1>My Shows</h1>
      </header>

      <MyShowsList />
    </main>
  );
};
