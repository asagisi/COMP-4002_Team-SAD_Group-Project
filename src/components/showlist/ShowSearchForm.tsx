import { type Show } from '../../types/Show';

type ShowSearchFormProps = {
  searchShow: string;
  setSearchShow: (value: string) => void;
  filteredShow: Show[];
  toggleHide: (id: number) => void;
};

export const ShowSearchForm: React.FC<ShowSearchFormProps> = ({
  searchShow,
  setSearchShow,
  filteredShow,
  toggleHide,
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
            <button onClick={() => toggleHide(show.id)}>Hide show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};