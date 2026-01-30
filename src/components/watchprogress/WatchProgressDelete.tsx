import React, { useState } from "react";

type Props = {
  title: string;
  onDelete: () => void;
};

export const WatchProgressDelete: React.FC<Props> = ({
  title,
  onDelete,
}) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      {!confirm && (
        <button onClick={() => setConfirm(true)}>
          Delete
        </button>
      )}

      {confirm && (
        <span className="delete-confirm">
            Are you sure?
          <button onClick={onDelete}>
            Yes
          </button>
          <button onClick={() => setConfirm(false)}>
            No
          </button>
        </span>
      )}
    </>
  );
};
