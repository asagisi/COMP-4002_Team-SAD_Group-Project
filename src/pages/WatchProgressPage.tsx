import "../components/watchprogress/WatchProgress.css";
import { useWatchProgress } from "../components/watchprogress/WatchProgress";
import { WatchProgressAdd } from "../components/watchprogress/WatchProgressAdd";
import { WatchProgressEdit } from "../components/watchprogress/WatchProgressEdit";
import { WatchProgressDelete } from "../components/watchprogress/WatchProgressDelete";

export const WatchProgressPage = () => {
  const {
    progress,
    setProgress,
    editId,
    setEditId,
    statusClass,
    handleSave,
    handleDelete,
  } = useWatchProgress();

  return (
    <div>
      <section className="watch-progress">
        <h2>My Watch Progress</h2>

        <section className="add-show">
          <WatchProgressAdd progress={progress} setProgress={setProgress}/>
        </section>

        <section className="watch-list">
          <ul>
            {progress.map(item =>
              editId === item.id ? (
                <WatchProgressEdit
                  key={item.id}
                  item={item}
                  onSave={handleSave}
                  onCancel={() => setEditId(null)}
                />
              ) : (
                <li
                  key={item.id}
                  className={statusClass[item.status]}
                >
                  <span>
                    {item.title} – {item.status}
                    {item.status !== "Not Started" && (
                      <>
                        {" "}
                        (S{item.currentSeason}:Ep{item.currentEpisode}
                        /S{item.totalSeasons})
                      </>
                    )}
                  </span>

                  <div>
                    <button onClick={() => setEditId(item.id)}>
                      Edit
                    </button>

                    <WatchProgressDelete
                      title={item.title}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </div>
                </li>
              )
            )}
          </ul>
        </section>
      </section>
    </div>
  );
};
