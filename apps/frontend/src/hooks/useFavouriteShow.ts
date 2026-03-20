import { useState } from 'react';
import type { Show } from '../types/Show';

// custom hook for favourite show state.
// components can use this instead of passing favourite state through props.
export const useFavouriteShow = () => {
    const [currentFavourite, setCurrentFavourite] = useState<Show | null>(null);

    return {
        currentFavourite,
        setCurrentFavourite,
    };
};
