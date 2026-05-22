import { TimeControl, type Result } from "~/types/TypeControl";

export type RecentGames = {
    readonly id: string;
    readonly opponentFideId: number;
    readonly opponentName: string;
    readonly opponentRating: number;
    readonly change: number;
    readonly result: Result;
    readonly date: string;
    readonly round: string;
    readonly tournament: string;
    readonly createAt: string
};

export type TopRating = {
    readonly rank: number;
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
    readonly stdRatings: Content;
    readonly rapidRatings: Content;
    readonly blitzRatings: Content;
  };

  export type Content = {
    content: TopRating[];
    totalCount: number;
  }

export async function getTopRatings(page: number, tab: TimeControl):Promise<TopRatingsResponse> {
    try {
        if(page === 0) {
          const response = await fetch("http://localhost:8080/top-ratings");
          if(!response.ok) throw new Error(`API error: ${response.status}`);
          const data = await response.json();
          console.log(data);
          return data;
        }

        const endpoint = tab === TimeControl.BLITZ 
            ? "blitz-ratings" 
            : tab === TimeControl.RAPID 
              ? "rapid-ratings" 
              : "std-ratings";

        const response = await fetch(`http://localhost:8080/${endpoint}?page=${page}`);

        const pageData = await response.json() 

        console.log(pageData)

        return {
          stdRatings: tab === TimeControl.CLASSICAL ? pageData : null,
          rapidRatings: tab === TimeControl.RAPID ? pageData : null,
          blitzRatings: tab === TimeControl.BLITZ ? pageData : null,
        }
    } catch (err) {
        console.error("Error happened with fetching getStdRatings");
        throw err;
    }
}