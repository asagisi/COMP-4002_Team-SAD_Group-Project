import { useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';
import type { Show } from '../../../../shared/types/Show';
import { AUTH_REQUIRED_MESSAGE, showRepository } from '../repositories/showRepository';

// custom hook for favourite show state.
// components can use this instead of passing favourite state through props.
export const useFavouriteShow = () => {
    const { isSignedIn, userId } = useAuth();
    const [currentFavourite, setCurrentFavouriteState] = useState<Show | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const loadCurrentFavourite = async () => {
            if (!isSignedIn) {
                if (isMounted) {
                    setCurrentFavouriteState(null);
                    setLoading(false);
                    setError(AUTH_REQUIRED_MESSAGE);
                }
                return;
            }

            setLoading(true);
            setError('');

            try {
                const favourite = await showRepository.getCurrentFavouriteShow();

                if (isMounted) {
                    setCurrentFavouriteState(favourite);
                    setError('');
                }
            } catch (loadError) {
                const message =
                    loadError instanceof Error ? loadError.message : 'Failed to load current favourite show.';

                if (isMounted) {
                    setCurrentFavouriteState(null);
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void loadCurrentFavourite();

        return () => {
            isMounted = false;
        };
    }, [isSignedIn, userId]);

    const setCurrentFavourite = async (show: Show) => {
        if (!isSignedIn) {
            setError(AUTH_REQUIRED_MESSAGE);
            return;
        }

        const previous = currentFavourite;
        setCurrentFavouriteState(show);
        setError('');

        try {
            const persisted = await showRepository.setCurrentFavouriteShow(show.id);
            setCurrentFavouriteState(persisted);
        } catch (saveError) {
            setCurrentFavouriteState(previous);
            const message =
                saveError instanceof Error ? saveError.message : 'Failed to save current favourite show.';
            setError(message);
        }
    };

    return {
        currentFavourite,
        setCurrentFavourite,
        loading,
        error,
        isSignedIn,
    };
};
