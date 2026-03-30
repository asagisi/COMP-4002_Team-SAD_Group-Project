import type { MyShow } from "../components/types/MyShowsType";
import { myShowsData } from "../components/data/MyShows";

// Get 

export function fetchMyShows(): MyShow[] {
  return myShowsData;
}

export function getMyShowById(id: number): MyShow {
  const found = myShowsData.find(show => show.id === id);

  if (!found) {
    throw new Error(`Show ${id} not found`);
  }

  return found;
}

// Update

export async function updateMyShow(updatedShow: MyShow) {
  const index = myShowsData.findIndex(s => s.id === updatedShow.id);

  if (index === -1) {
    throw new Error(`Failed to update show ${updatedShow.id}`);
  }

  myShowsData[index] = updatedShow;
  return myShowsData[index];
}

// Create

export async function addMyShow(show: MyShow) {
  myShowsData.push(show);
  return show;
}

// Delete

export async function deleteMyShow(id: number) {
  const index = myShowsData.findIndex(s => s.id === id);

  if (index === -1) {
    throw new Error(`Failed to delete show ${id}`);
  }

  return myShowsData.splice(index, 1)[0];
}

// Favourites

export async function addFavouriteShow(id: number) {
  const show = getMyShowById(id);
  show.isFavourite = true;
  return show;
}

export async function removeFavouriteShow(id: number) {
  const show = getMyShowById(id);
  show.isFavourite = false;
  return show;
}