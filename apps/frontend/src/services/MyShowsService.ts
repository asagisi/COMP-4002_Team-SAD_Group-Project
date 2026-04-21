import * as MyShowsRepo from "../repositories/MyShowsRepo";
import type { MyShow } from "../../../../shared/types/MyShowsType";

const MIN_RATING = 1;
const MAX_RATING = 5;

// Gets all shows from the repository. 
export async function fetchMyShows(): Promise<MyShow[]> {
  const shows = await MyShowsRepo.fetchMyShows();
  return shows;
}

// Toggles favourite for a show 
export async function toggleFavouriteShow(showId: number): Promise<MyShow> {
  const show = await MyShowsRepo.getMyShowById(showId);
  if (show.isFavourite) {
    return MyShowsRepo.removeFavouriteShow(show.id);
  } else {
    return MyShowsRepo.addFavouriteShow(show.id);
  }
}

// Updates a show's rating
export async function updateShowRating(showId: number, rating: number): Promise<MyShow> {
  const fixedRating = Math.min(MAX_RATING, Math.max(MIN_RATING, Math.floor(rating)));
  return MyShowsRepo.updateMyShowRating(showId, fixedRating);
}
