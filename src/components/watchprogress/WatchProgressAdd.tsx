import React, { useState } from "react";
import type { WatchProgress as WatchProgressType } from "../types/WatchProgressType";

type Props = {
  progress: WatchProgressType[];
  setProgress: React.Dispatch<
    React.SetStateAction<WatchProgressType[]>
  >;
};

export const WatchProgressAdd: React.FC<Props> = ({
  progress,
  setProgress,
}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (newWatch: React.FormEvent) => {
    newWatch.preventDefault();

    if (title.trim() === "") {
      setError("Show title is required");
      return;
    }

    setError("");
    setProgress([
      ...progress,
      {
        id: Date.now(),
        title,
        currentSeason: 1,
        currentEpisode: 1,
        totalSeasons: 1,
        status: "Not Started",
      },
    ]);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a show to the watch list!"
        value={title}
        onChange={newWatch => setTitle(newWatch.target.value)}
      />
      <button type="submit">Add Show</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};
