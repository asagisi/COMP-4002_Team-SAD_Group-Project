import type { MyShow } from "../components/types/MyShowsType";
import { shows } from "../components/data/shows";
import {
  getShowPref,
  isShowHidden,
  setShowFavourite,
  setShowHidden,
  setShowRating,
} from "./userShowPrefsRepo";

// Get 

export function fetchMyShows(): MyShow[] {
  return shows
    .filter((show) => !isShowHidden(show.id))
    .map((show) => {
      const pref = getShowPref(show.id);
      return {
        id: show.id,
        title: show.title,
        rating: pref.rating,
        isFavourite: pref.isFavourite,
      };
    });
}

export function getMyShowById(id: number): MyShow {
  const found = fetchMyShows().find(show => show.id === id);

  if (!found) {
    throw new Error(`Show ${id} not found`);
  }

  return found;
}

// Update

export async function updateMyShow(updatedShow: MyShow) {
  const exists = shows.some((show) => show.id === updatedShow.id);
  if (!exists) {
    throw new Error(`Failed to update show ${updatedShow.id}`);
  }

  setShowRating(updatedShow.id, updatedShow.rating);
  setShowFavourite(updatedShow.id, updatedShow.isFavourite);
  return getMyShowById(updatedShow.id);
}

// Create

export async function addMyShow(show: MyShow) {
  const exists = shows.some((item) => item.id === show.id);
  if (!exists) {
    throw new Error(`Failed to add show ${show.id}`);
  }

  setShowHidden(show.id, false);
  setShowRating(show.id, show.rating);
  setShowFavourite(show.id, show.isFavourite);
  return getMyShowById(show.id);
}

// Delete

export async function deleteMyShow(id: number) {
  const show = shows.find((item) => item.id === id);
  if (!show) {
    throw new Error(`Failed to delete show ${id}`);
  }

  setShowHidden(id, true);
  return {
    id: show.id,
    title: show.title,
    rating: getShowPref(id).rating,
    isFavourite: getShowPref(id).isFavourite,
  };
}

// Favourites

export async function addFavouriteShow(id: number) {
  setShowFavourite(id, true);
  return getMyShowById(id);
}

export async function removeFavouriteShow(id: number) {
  setShowFavourite(id, false);
  return getMyShowById(id);
}