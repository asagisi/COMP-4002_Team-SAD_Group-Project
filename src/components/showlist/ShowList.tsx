import React, { useState } from 'react';
import './ShowList.css'; 
import { shows } from '../data/shows';
import { ShowSearchForm } from './ShowSearchForm';

export const ShowList: React.FC = () => {   // react functional component

    // States for the search, and hidden shows functionality

    const [searchShow, setSearchShow] = useState('');
    const [hiddenShows, setHiddenShows] = useState<Set<number>>(new Set());
    const [showHidden, setShowHidden] = useState(false);

    const filteredShow = shows.filter(show =>
        show.title.toLowerCase().includes(searchShow.toLowerCase()) &&
        !hiddenShows.has(show.id)
    );

    const hiddenShowList = shows.filter(show => hiddenShows.has(show.id));

    // this will hide the show if the user clicks the hide button
    const toggleHide = (id: number) => {
        setHiddenShows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <section className="show-list">
            <div className="section-header">
                <h2>List of shows</h2>
            </div>
            <ShowSearchForm
                searchShow={searchShow}
                setSearchShow={setSearchShow}
                filteredShow={filteredShow}
                toggleHide={toggleHide}
            />

            {hiddenShowList.length > 0 && ( // && means only render right side of the && if left side is true
                <div className="hidden-shows">
                    <button onClick={() => setShowHidden(!showHidden)}>
                        {showHidden ? 'Hide' : 'Show'} Hidden Shows ({hiddenShowList.length})
                    </button>
                    {showHidden && (
                        <ul>
                            {hiddenShowList.map(show => (
                                <li key={show.id}>
                                    <strong>{show.title}</strong> - {show.genre} ({show.year})
                                    <button onClick={() => toggleHide(show.id)}>Unhide show</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </section>
    );
}