import type { RecentGames } from "~/api/getTopRatings";

export type User = {
  fideId?: number;
  name: string;
  country: string;
  year: number;
  peakRating: number;
  peakRatingDate: string;
  rating: number;
  ratingChange: number;
  count: number;
  recentGames: RecentGames[]
};
