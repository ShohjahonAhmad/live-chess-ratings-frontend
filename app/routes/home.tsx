import type { Route } from "./+types/home";
import Menu from "../menu/Menu";
import { getTopRatings, type Content } from "~/api/getTopRatings";
import RatingPage from "~/rating/RatingPage";
import { TimeControl } from "~/types/TypeControl";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { SortBy, SortDirection } from "~/types/Sorting";

const ratingsCache = new Map<string, Promise<Content>>();

setInterval(() => {
  ratingsCache.clear();
}, 300000); //every 5 minutes

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Chess Rankings" },
    { name: "description", content: "Welcome to World Chess Rankings!" },
  ];
}

export async function getCachedRatings(
  page: number,
  tab: TimeControl,
  country: string,
  search: string,
  sort: SortBy,
  dir: SortDirection,
  onlyActive: string
): Promise<Content> {
  const key = `${tab}-${country}-${page}-${sort}-${dir}-${onlyActive}-${search}`;

  if (ratingsCache.has(key)) {
    return ratingsCache.get(key)!;
  }

  const promise = getTopRatings(
    page,
    tab,
    country,
    search,
    sort,
    dir,
    onlyActive
  );

  if (
    page === 0 &&
    country === "ALL" &&
    search === "" &&
    sort === SortBy.RATING &&
    dir === SortDirection.DESC &&
    onlyActive === "true"
  ) {
    ratingsCache.set(
      "Classical-ALL-0-RATING-DESC-true-",
      promise.then((data) => data.stdRatings)
    );
    ratingsCache.set(
      "Rapid-ALL-0-RATING-DESC-true-",
      promise.then((data) => data.rapidRatings)
    );
    ratingsCache.set(
      "Blitz-ALL-0-RATING-DESC-true-",
      promise.then((data) => data.blitzRatings)
    );
  } else {
    ratingsCache.set(
      key,
      promise.then((data) =>
        tab === TimeControl.BLITZ
          ? data.blitzRatings
          : tab === TimeControl.RAPID
            ? data.rapidRatings
            : data.stdRatings
      )
    );
  }

  return ratingsCache.get(key)!;
}

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page") || "0");
  const tab = (searchParams.get("tab") as TimeControl) ?? TimeControl.CLASSICAL;
  const country = searchParams.get("country") || "ALL";
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as SortBy) || SortBy.RATING;
  const dir = (searchParams.get("dir") as SortDirection) || SortDirection.DESC;
  const onlyActive =
    (searchParams.get("onlyActive") === "false" && "false") || "true";

  return {
    ratings: getCachedRatings(
      page,
      tab,
      country,
      search,
      sort,
      dir,
      onlyActive
    ),
  };
}

export default function Home() {
  return (
    <>
      <Menu />
      <RatingPage />
    </>
  );
}
