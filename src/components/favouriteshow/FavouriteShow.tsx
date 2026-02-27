import { useState } from 'react';
import { type Show } from '../../types/Show';
import { showRepository } from '../../repositories/showRepository';
import './FavouriteShow.css';

interface FavouriteShowSelectorProps {
    currentFavourite: Show | null;
    setCurrentFavourite: (show: Show | null) => void;
}

// this is the favourite show component

export const FavouriteShowSelector = ({
    currentFavourite,
    setCurrentFavourite
}: FavouriteShowSelectorProps) => {
    const [query, setQuery] = useState('');

    // this const filters the shows based on the query and limits to top 3 results; don't want to overflow the page
    const filteredShows = showRepository
        .getAllShows()
        .filter(show => show.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3); // remember, slice returns a piece of the array using its index ; meanwhile splice would change the original array

    return (
        <div className="favourite-show">
            <div className="favourite-label">Current favourite show:</div>
            <div className="favourite-current">
                {currentFavourite ? currentFavourite.title : 'Go ahead, pick one!'}
            </div>

            <input
                className="favourite-input"
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search shows..."
            />
            {query.trim().length > 0 && (
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
                                onClick={() => {
                                    setCurrentFavourite(show); // this updates the state of the favourite show.
                                    setQuery(''); // to close dropdown after selection
                                }}>
                                {show.title}

                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
