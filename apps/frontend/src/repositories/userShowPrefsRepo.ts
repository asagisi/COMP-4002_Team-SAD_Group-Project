import { myShowsData } from "../components/data/MyShows";

type UserShowPref = {
  rating: number;
  isFavourite: boolean;
  isHidden: boolean;
};

type UserShowPrefMap = Record<number, UserShowPref>;

const STORAGE_KEY = "team-sad-user-show-prefs-v1";

function clampRating(value: number): number {
  return Math.min(5, Math.max(1, Math.floor(value)));
}

function loadPrefs(): UserShowPrefMap {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as UserShowPrefMap;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function savePrefs(prefMap: UserShowPrefMap): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefMap));
}

const prefs: UserShowPrefMap = loadPrefs();

for (const show of myShowsData) {
  if (!prefs[show.id]) {
    prefs[show.id] = {
      rating: clampRating(show.rating),
      isFavourite: Boolean(show.isFavourite),
      isHidden: false,
    };
  }
}

savePrefs(prefs);

function ensurePref(showId: number): UserShowPref {
  if (!prefs[showId]) {
    prefs[showId] = {
      rating: 3,
      isFavourite: false,
      isHidden: false,
    };
    savePrefs(prefs);
  }

  return prefs[showId];
}

export function getShowPref(showId: number): UserShowPref {
  return { ...ensurePref(showId) };
}

export function setShowRating(showId: number, rating: number): UserShowPref {
  const pref = ensurePref(showId);
  pref.rating = clampRating(rating);
  savePrefs(prefs);
  return { ...pref };
}

export function setShowFavourite(showId: number, isFavourite: boolean): UserShowPref {
  const pref = ensurePref(showId);
  pref.isFavourite = isFavourite;
  savePrefs(prefs);
  return { ...pref };
}

export function setShowHidden(showId: number, isHidden: boolean): UserShowPref {
  const pref = ensurePref(showId);
  pref.isHidden = isHidden;
  savePrefs(prefs);
  return { ...pref };
}

export function toggleShowHidden(showId: number): UserShowPref {
  const pref = ensurePref(showId);
  pref.isHidden = !pref.isHidden;
  savePrefs(prefs);
  return { ...pref };
}

export function isShowHidden(showId: number): boolean {
  return ensurePref(showId).isHidden;
}

export function getHiddenShowIds(): Set<number> {
  const ids = Object.entries(prefs)
    .filter(([, value]) => value.isHidden)
    .map(([key]) => Number(key));

  return new Set(ids);
}
