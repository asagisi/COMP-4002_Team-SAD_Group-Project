import React, { useState } from "react";
import type { WatchProgress as WatchProgressType } from "../types/WatchProgressType";

type Props = {
  item: WatchProgressType;
  onSave: (updated: WatchProgressType) => void;
  onCancel: () => void;
};

export const WatchProgressEdit: React.FC<Props> = ({
  item,
  onSave,
  onCancel,
}) => {
  const [currentSeason, setCurrentSeason] = useState(item.currentSeason);
  const [currentEpisode, setCurrentEpisode] = useState(item.currentEpisode);
  const [status, setStatus] =
    useState<WatchProgressType["status"]>(item.status);

  const handleSave = () => {
    onSave({
      ...item,
      currentSeason,
      currentEpisode,
      status,
    });
  };

  return (
    <li>
      <div>
        <strong>{item.title} </strong>
      </div>
      <div>
        <label>
          Season
          <input
            type="number"
            min={1}
            value={currentSeason}
            onChange={edit => setCurrentSeason(Number(edit.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Episode
          <input
            type="number"
            min={1}
            value={currentEpisode}
            onChange={edit => setCurrentEpisode(Number(edit.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Status
          <select
            value={status}
            onChange={edit =>
              setStatus(
                edit.target.value as WatchProgressType["status"]
              )
            }
          >
            <option value="Not Started">Not Started</option>
            <option value="Watching">Watching</option>
            <option value="Finished">Finished</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </li>
  );
};
