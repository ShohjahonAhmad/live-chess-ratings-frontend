import type { Result } from "~/types/TypeControl";

export type RecentGames = {
    readonly id: string;
    readonly opponentFideId: number;
    readonly opponentName: string;
    readonly change: number;
    readonly result: Result;
    readonly date: string;
    readonly round: string;
    readonly tournament: string;
    readonly createAt: string
};

export type TopRating = {
    readonly fideId: number;
    readonly name: string;
    readonly country: string;
    readonly year: number;
    readonly rating: number;
    readonly ratingChange: number;
    readonly count: number;
    readonly recentGames: RecentGames[];
};
  
  export type TopRatingsResponse = {
    readonly stdRatings: TopRating[];
    readonly rapidRatings: TopRating[];
    readonly blitzRatings: TopRating[];
  };

export async function getTopRatings():Promise<TopRatingsResponse> {
    try {
        const response = await fetch("http://localhost:8080/top-ratings");

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        console.log(JSON.stringify(data.stdRatings[0]));

        return data;
    } catch (err) {
        console.error("Error happened with fetching getStdRatings");
        throw err;
    }
}