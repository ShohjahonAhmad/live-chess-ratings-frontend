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
  dir: SortDirection
): Promise<Content> {
  const key = `${tab}-${country}-${page}-${sort}-${dir}-${search}`;

  if (ratingsCache.has(key)) {
    return ratingsCache.get(key)!;
  }

  const promise = getTopRatings(page, tab, country, search, sort, dir);

  if (
    page === 0 &&
    country === "ALL" &&
    search === "" &&
    sort === SortBy.RATING &&
    dir === SortDirection.DESC
  ) {
    ratingsCache.set(
      "Classical-ALL-0-RATING-DESC-",
      promise.then((data) => data.stdRatings)
    );
    ratingsCache.set(
      "Rapid-ALL-0-RATING-DESC-",
      promise.then((data) => data.rapidRatings)
    );
    ratingsCache.set(
      "Blitz-ALL-0-RATING-DESC-",
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

  return { ratings: getCachedRatings(page, tab, country, search, sort, dir) };
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeControl =
    (searchParams.get("tab") as TimeControl) ?? TimeControl.CLASSICAL;
  const page = Number(searchParams.get("page") || "0");
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const sortBy = (searchParams.get("sort") as SortBy) || SortBy.RATING;
  const sortDirection =
    (searchParams.get("dir") as SortDirection) || SortDirection.DESC;

  useEffect(() => {
    const delayedParam = setTimeout(() => {
      setSearchParams((prev) => {
        if (search.trim()) {
          prev.set("search", search.trim());
        } else {
          prev.delete("search");
        }

        prev.set("page", "0");

        return prev;
      });
    }, 400);

    return () => clearTimeout(delayedParam);
  }, [search]);

  const setCountry = (country: string) => {
    setSearchParams((prev) => {
      prev.set("country", country);
      prev.set("page", "0");

      return prev;
    });
  };

  const setTimeControl = (tc: TimeControl) => {
    setSearchParams(
      (prev) => {
        prev.set("tab", tc);
        prev.set("page", "0");

        return prev;
      },
      { preventScrollReset: true }
    );
  };

  const setPage = (newPage: number) => {
    setSearchParams(
      (prev) => {
        prev.set("page", String(newPage));

        return prev;
      },
      { preventScrollReset: true }
    );
  };

  const setSort = (sorting: SortBy) => {
    setSearchParams((prev) => {
      if (sortBy !== sorting) {
        prev.set("page", "0");
        prev.set("dir", SortDirection.DESC);
      } else {
        prev.set(
          "dir",
          sortDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC
        );
      }

      prev.set("sort", sorting);

      return prev;
    });
  };
  return (
    <>
      <Menu timeControl={timeControl} setTimeControl={setTimeControl} />
      <RatingPage
        timeControl={timeControl}
        page={page}
        setPage={setPage}
        setCountry={setCountry}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        sortDirection={sortDirection}
        setSort={setSort}
      />
    </>
  );
}
