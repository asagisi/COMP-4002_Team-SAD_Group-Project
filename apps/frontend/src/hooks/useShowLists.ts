import { useEffect, useState } from 'react';
import { showRepository } from '../repositories/showRepository';
import type { Show } from '../types/Show';

type ShowWithPrefs = Show & {
    isHidden: boolean;
    isFavourite: boolean;
    rating: number | null;
};

// this is the custom hook, it uses the show repository and handles states for the show list component.
// now component doesnt perform logic and such, renders a ui.

export const useShowLists = () => {
    const [shows, setShows] = useState<ShowWithPrefs[]>(showRepository.getCachedShows());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // state set up for search, hidden and to toggle shows you dont want to see
    const [searchShow, setSearchShow] = useState('');
    const [showHidden, setShowHidden] = useState(false);

    useEffect(() => {
        const loadShows = async () => {
            try {
                const data = await showRepository.getAllShowsFromApi();
                setShows(data);
                setError('');
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to load shows.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadShows();
    }, []);

    // this const will filter shows based on search, hidden status.
    const filteredShow = shows.filter(show =>
        show.title.toLowerCase().includes(searchShow.toLowerCase()) &&
        !show.isHidden
    );

    // this const will filter shows based on hidden status.
    const hiddenShowList = shows.filter(show => show.isHidden);

    // a toggle to hide or unhide a show. if show is hidden it will be unhidden.
    const toggleHide = async (id: number) => {
        if (loading) {
            setError('Shows are still syncing. Try again in a moment.');
            return;
        }

        const existing = shows.find((show) => show.id === id);
        if (!existing) {
            return;
        }

        const nextHidden = !existing.isHidden;
        const previous = shows;
        setShows((prev) =>
            prev.map((show) => (show.id === id ? { ...show, isHidden: nextHidden } : show))
        );
        setError('');

        try {
            const updated = await showRepository.setHidden(id, nextHidden);
            setShows((prev) =>
                prev.map((show) => (show.id === id ? { ...show, ...updated } : show))
            );
            setError('');
        } catch (err) {
            setShows(previous);
            const message = err instanceof Error ? err.message : 'Failed to update hidden state.';
            setError(message);
        }
    };

    const getShowMeta = (id: number) => {
        const found = shows.find((show) => show.id === id);
        return {
            rating: found?.rating ?? 0,
            isFavourite: found?.isFavourite ?? false,
            isHidden: found?.isHidden ?? false,
        };
    };

    return {
        shows,
        loading,
        error,
        searchShow,
        setSearchShow,
        showHidden,
        setShowHidden,
        filteredShow,
        hiddenShowList,
        toggleHide,
        getShowMeta,
    };
};
