import { useState } from 'react';
import { showRepository } from '../../repositories/showRepository';
import './FavouriteShow.css';
import { useFavouriteShow } from '../../hooks/useFavouriteShow';

export const FavouriteShowSelector: React.FC = () => {
    const { currentFavourite, setCurrentFavourite, loading, error, isSignedIn } = useFavouriteShow();
    const [query, setQuery] = useState('');


    // this const filters the shows based on the query and limits to top 3 results; don't want to overflow the page
    const filteredShows = showRepository
        .getAllShows()
        .filter(show => show.title.toLowerCase().startsWith(query.toLowerCase())) // starts with just feels better than an inlcudes type of query
        .slice(0, 3); // remember, slice returns a piece of the array using its index ; meanwhile splice would change the original array

    return (
        <div className="favourite-show">
            <div className="favourite-label">Current favourite show:</div>
            <div className="favourite-current">
                {loading
                    ? 'Loading your favourite...'
                    : currentFavourite
                        ? currentFavourite.title
                        : isSignedIn
                            ? 'Go ahead, pick one!'
                            : error}
            </div>

            <input
                className="favourite-input"
                type="text"
                value={query}
                disabled={!isSignedIn}
                onChange={event => setQuery(event.target.value)}
                placeholder={isSignedIn ? "Search shows..." : "Sign in to pick a favourite"}
            />
            {isSignedIn && query.trim().length > 0 && (
                <div className="favourite-dropdown">
                    {filteredShows.length === 0 ? ( // if length of filtered shows is 0, it will show no matches
                        <div className="favourite-empty">No matches!
                         sorry our list is small...</div>
                    ) : (
                        filteredShows.map(show => (
                            <button
                                key={show.id}
                                type="button"
                                className="favourite-option"
                                onClick={async () => {
                                    await setCurrentFavourite(show); // this updates the state of the favourite show.
                                    setQuery(''); // to close dropdown after selection
                                }}>
                                {show.title}

                            </button>
                        ))
                    )}
                </div>
            )}
            {isSignedIn && error && (
                <div className="favourite-error" role="alert">{error}</div>
            )}
        </div>
    );
};
