import React from 'react';
import './ShowList.css'; 
import { ShowSearchForm } from './ShowSearchForm';
import { useShowLists } from '../../hooks/useShowLists';

/**
 * ShowList Component
 * 
 * this is the show list component that utilizes all the individual criteria such as:
 * - A repository the has the ability to perform CRUD
 * - The repository utilizes the test data created for shows
 * - finally, the logic and state is now in useShowLists, now all the component does is deal with UI.
 */
export const ShowList: React.FC = () => {
    // Use the custom hook to get all state and functions
    const {
        searchShow,
        setSearchShow,
        showHidden,
        setShowHidden,
        filteredShow,
        hiddenShowList,
        toggleHide,
        getShowMeta,
    } = useShowLists();

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
                getShowMeta={getShowMeta}
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