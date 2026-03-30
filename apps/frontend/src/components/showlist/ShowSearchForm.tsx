import { type ShowSearchFormProps } from '../../types/showSearchForm';

export const ShowSearchForm: React.FC<ShowSearchFormProps> = ({
  searchShow,
  setSearchShow,
  filteredShow,
  toggleHide,
  getShowMeta,
}) => {
  return (
    <div className="show-search">
      <input
        type="text"
        placeholder="Search shows..."
        value={searchShow}
        onChange={(e) => setSearchShow(e.target.value)}
      />
      <ul>
        {filteredShow.map((show) => (
          <li key={show.id}>
            <strong>{show.title}</strong> - {show.genre} ({show.year})
            <span> | Rating: {getShowMeta(show.id).rating}/5</span>
            <span>{getShowMeta(show.id).isFavourite ? " | Favourite: Yes" : ""}</span>
            <button onClick={() => toggleHide(show.id)}>Hide show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};