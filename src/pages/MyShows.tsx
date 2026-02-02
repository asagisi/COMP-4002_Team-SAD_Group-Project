import React, { useState } from "react";
import { MyShowsList } from "../components/myshows/MyShows";

export const MyShowsPage: React.FC = () => {
  const [ratings, setRatings] = useState<Record<number, number>>({});

  return (
    
      <div>
        <h1>My Shows</h1>
        <MyShowsList ratings={ratings} setRatings={setRatings}/>
      </div>
    
  );
};
