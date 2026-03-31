import type { MyShow } from "../components/types/MyShowsType";
import { showRepository } from "./showRepository";

// Get 

export async function fetchMyShows(): Promise<MyShow[]> {
  const shows = await showRepository.getAllShowsFromApi();

  return shows
    .filter((show) => !show.isHidden)
    .map((show) => {
      return {
        id: show.id,
        title: show.title,
        rating: show.rating ?? 1,
        isFavourite: show.isFavourite,
      };
    });
}

export async function getMyShowById(id: number): Promise<MyShow> {
  const found = (await fetchMyShows()).find(show => show.id === id);

  if (!found) {
    throw new Error(`Show ${id} not found`);
  }

  return found;
}

// Update

export async function updateMyShow(updatedShow: MyShow) {
  const updated = await showRepository.setPreferences(updatedShow.id, {
    rating: updatedShow.rating,
    isFavourite: updatedShow.isFavourite,
  });

  return {
    id: updated.id,
    title: updated.title,
    rating: updated.rating ?? 1,
    isFavourite: updated.isFavourite,
  };
}

export async function updateMyShowRating(showId: number, rating: number): Promise<MyShow> {
  const updated = await showRepository.setPreferences(showId, { rating });

  return {
    id: updated.id,
    title: updated.title,
    rating: updated.rating ?? 1,
    isFavourite: updated.isFavourite,
  };
}

export async function updateMyShowFavourite(showId: number, isFavourite: boolean): Promise<MyShow> {
  const updated = await showRepository.setPreferences(showId, { isFavourite });

  return {
    id: updated.id,
    title: updated.title,
    rating: updated.rating ?? 1,
    isFavourite: updated.isFavourite,
  };
}

// Create

export async function addMyShow(show: MyShow) {
  const updated = await showRepository.setHidden(show.id, false);
  await showRepository.setPreferences(show.id, {
    rating: show.rating,
    isFavourite: show.isFavourite,
  });

  return {
    id: updated.id,
    title: updated.title,
    rating: show.rating,
    isFavourite: show.isFavourite,
  };
}

// Delete

export async function deleteMyShow(id: number) {
  const updated = await showRepository.setHidden(id, true);
  return {
    id: updated.id,
    title: updated.title,
    rating: updated.rating ?? 1,
    isFavourite: updated.isFavourite,
  };
}

// Favourites

export async function addFavouriteShow(id: number) {
  return updateMyShowFavourite(id, true);
}

export async function removeFavouriteShow(id: number) {
  return updateMyShowFavourite(id, false);
}