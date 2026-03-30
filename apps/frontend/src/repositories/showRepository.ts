import { shows } from "../../../backend/data/shows";
import type { Show } from "../../../../shared/types/Show";

/**
 * Show Repository
 * Handles CRUD when it comes to tv shows
 */
export const showRepository = {
    /**
     * Retrieve all shows
     */
    getAllShows: (): Show[] => {
        return [...shows]; // spread operator, remember it takes all elemnents and then puts it into new array.
    },

    /**
     * Retrieve a show by ID
     */
    getShowById: (id: number): Show | undefined => {
        return shows.find(show => show.id === id);
    },

    /**
     * Create a new show (adds to shows array)
     */
    createShow: (show: Omit<Show, 'id'>): Show => {
        const newShow: Show = {
            ...show,
            id: Math.max(...shows.map(s => s.id), 0) + 1,
        };
        shows.push(newShow);
        return newShow;
    },

    /**
     * Update an existing show
     */
    updateShow: (id: number, updates: Partial<Omit<Show, 'id'>>): Show | undefined => {
        const show = shows.find(s => s.id === id);
        if (show) {
            Object.assign(show, updates);
        }
        return show;
    },

    /**
     * Delete a show by ID
     */
    deleteShow: (id: number): boolean => {
        const index = shows.findIndex(s => s.id === id);
        if (index > -1) {
            shows.splice(index, 1);
            return true;
        }
        return false;
    },
};