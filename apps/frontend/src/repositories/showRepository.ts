import type { Show } from "../types/Show";
import { shows } from "../components/data/shows";

export type ApiWatchStatus = "NOT_STARTED" | "WATCHING" | "FINISHED";

export type ShowWithPrefs = Show & {
    isHidden: boolean;
    isFavourite: boolean;
    rating: number | null;
    currentEpisode: number;
    totalEpisodes: number;
    status: ApiWatchStatus;
};

const DEFAULT_USER_ID = 1;
const API_BASE = "/api/v1/shows";
const SHOW_CACHE_KEY = "team-sad-shows-cache-v1";

let showCache: ShowWithPrefs[] | null = null;

function loadShowCache(): ShowWithPrefs[] | null {
    if (showCache) {
        return [...showCache];
    }

    if (typeof window === "undefined") {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(SHOW_CACHE_KEY);
        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as ShowWithPrefs[];
        if (!Array.isArray(parsed)) {
            return null;
        }

        showCache = parsed;
        return [...parsed];
    } catch {
        return null;
    }
}

function saveShowCache(rows: ShowWithPrefs[]): void {
    showCache = [...rows];

    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(SHOW_CACHE_KEY, JSON.stringify(rows));
}

function upsertCachedShow(updated: ShowWithPrefs): void {
    const current = loadShowCache() ?? [];
    const next = current.some((row) => row.id === updated.id)
        ? current.map((row) => (row.id === updated.id ? updated : row))
        : [...current, updated];

    saveShowCache(next);
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? `Request failed with status ${response.status} at ${response.url}`);
    }

    return response.json() as Promise<T>;
}

/**
 * Show Repository
 * Handles CRUD when it comes to tv shows
 */
export const showRepository = {
    getCachedShows: (): ShowWithPrefs[] => {
        return loadShowCache() ?? [];
    },

    /**
     * Retrieve all shows from local source (legacy consumers)
     */
    getAllShows: (): Show[] => {
        return [...shows];
    },

    /**
     * Retrieve all shows with user relationship data from backend
     */
    getAllShowsFromApi: async (): Promise<ShowWithPrefs[]> => {
        const response = await fetch(`${API_BASE}?userId=${DEFAULT_USER_ID}`, {
            cache: "no-store",
        });
        const data = await parseResponse<ShowWithPrefs[]>(response);
        saveShowCache(data);
        return data;
    },

    /**
     * Update hidden state for a show
     */
    setHidden: async (showId: number, isHidden: boolean): Promise<ShowWithPrefs> => {
        const response = await fetch(`${API_BASE}/${showId}/hidden`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: DEFAULT_USER_ID,
                isHidden,
            }),
        });

        const data = await parseResponse<ShowWithPrefs>(response);
        upsertCachedShow(data);
        return data;
    },

    setPreferences: async (
        showId: number,
        payload: { rating?: number; isFavourite?: boolean }
    ): Promise<ShowWithPrefs> => {
        const response = await fetch(`${API_BASE}/${showId}/preferences`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: DEFAULT_USER_ID,
                ...payload,
            }),
        });

        const data = await parseResponse<ShowWithPrefs>(response);
        upsertCachedShow(data);
        return data;
    },

    setWatchProgress: async (
        showId: number,
        payload: { currentEpisode: number; totalEpisodes: number; status: ApiWatchStatus }
    ): Promise<ShowWithPrefs> => {
        const response = await fetch(`${API_BASE}/${showId}/progress`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: DEFAULT_USER_ID,
                ...payload,
            }),
        });

        const data = await parseResponse<ShowWithPrefs>(response);
        upsertCachedShow(data);
        return data;
    },

    clearWatchProgress: async (showId: number): Promise<ShowWithPrefs> => {
        const response = await fetch(`${API_BASE}/${showId}/progress`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: DEFAULT_USER_ID,
            }),
        });

        const data = await parseResponse<ShowWithPrefs>(response);
        upsertCachedShow(data);
        return data;
    },
};