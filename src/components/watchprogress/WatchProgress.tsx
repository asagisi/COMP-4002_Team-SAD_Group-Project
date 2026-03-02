import { useState } from "react";
import type { WatchProgress as WatchProgressType } from "../types/WatchProgressType";
import { WatchProgress as WatchProgressList } from "../data/WatchProgressList";

export const useWatchProgress = () => {
  const [progress, setProgress] =
    useState<WatchProgressType[]>(WatchProgressList);
  const [editId, setEditId] = useState<number | null>(null);

  const statusClass: Record<WatchProgressType["status"], string> = {
    "Not Started": "status-not-started",
    "Watching": "status-watching",
    "Finished": "status-finished",
  };

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
    progress,
    setProgress,
    editId,
    setEditId,
    statusClass,
    handleSave,
    handleDelete,
  };
};