import React, { useState } from "react";

export const WatchProgressDelete: React.FC<Props> = ({ title, onDelete }) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      {!confirm && <button onClick={() => setConfirm(true)}>Delete</button>}
      {confirm && (
        <span>
          Are you sure?{" "}
          <button onClick={onDelete}>Yes</button>{" "}
          <button onClick={() => setConfirm(false)}>No</button>
        </span>
      )}
    </>
  );
};
