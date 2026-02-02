import { useState, useMemo } from "react";
import type { WatchProgress as WatchProgressType } from "../types/WatchProgressType";
import { WatchProgress as WatchProgressList } from "../data/WatchProgressList";
import { shows } from "../data/shows";

export const useWatchProgress = () => {
  const [progress, setProgress] = useState<WatchProgressType[]>(WatchProgressList);
  const [editId, setEditId] = useState<number | null>(null);

  const statusClass: Record<WatchProgressType["status"], string> = {
    "Not Started": "status-not-started",
    "Watching": "status-watching",
    "Finished": "status-finished",
  };

  const showTitle = useMemo(() => {
    return progress.map(item => {
      const show = shows.find(show => show.id === item.showId);
      return {
        ...item,
        title: show?.title ?? "Unknown",
      };
    });
  }, [progress]);

  const handleSave = (update: WatchProgressType) => {
    setProgress(prev =>
      prev.map(item => (item.id === update.id ? update : item))
    );
    setEditId(null);
  };

  const handleDelete = (id: number) => {
    setProgress(prev => prev.filter(item => item.id !== id));
  };

  return {
    progress: showTitle,
    setProgress,
    editId,
    setEditId,
    statusClass,
    handleSave,
    handleDelete,
  };
};