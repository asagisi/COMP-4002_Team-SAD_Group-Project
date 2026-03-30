import { useState } from 'react';
import { showRepository } from '../repositories/showRepository';
import {
    getHiddenShowIds,
    getShowPref,
    toggleShowHidden,
} from '../repositories/userShowPrefsRepo';

// this is the custom hook, it uses the show repository and handles states for the show list component.
// now component doesnt perform logic and such, renders a ui.

export const useShowLists = () => {
    // gets all shows by using the show repositories CRUD function. assigns to shows
    const shows = showRepository.getAllShows();

    // state set up for search, hidden and to toggle shows you dont want to see
    const [searchShow, setSearchShow] = useState('');
    const [hiddenShows, setHiddenShows] = useState<Set<number>>(getHiddenShowIds());
    const [showHidden, setShowHidden] = useState(false);

    // this const will filter shows based on search, hidden status.
    const filteredShow = shows.filter(show =>
        show.title.toLowerCase().includes(searchShow.toLowerCase()) &&
        !hiddenShows.has(show.id)
    );

    // this const will filter shows based on hidden status.
    const hiddenShowList = shows.filter(show => hiddenShows.has(show.id));

    // a toggle to hide or unhide a show. if show is hidden it will be unhidden.
    const toggleHide = (id: number) => {
        toggleShowHidden(id);
        setHiddenShows(getHiddenShowIds());
    };

    const getShowMeta = (id: number) => {
        return getShowPref(id);
    };

    return {
        shows,
        searchShow,
        setSearchShow,
        hiddenShows,
        showHidden,
        setShowHidden,
        filteredShow,
        hiddenShowList,
        toggleHide,
        getShowMeta,
    };
};
