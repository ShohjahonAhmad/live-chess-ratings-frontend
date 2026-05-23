import type { Route } from "./+types/home";
import Menu from "../menu/Menu";
import { getTopRatings, type Content } from "~/api/getTopRatings";
import RatingPage from "~/rating/RatingPage";
import { TimeControl } from "~/types/TypeControl";
import { useSearchParams } from "react-router";

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
  country: string
): Promise<Content> {
  const key = `${tab}-${country}-${page}`;

  if (ratingsCache.has(key)) {
    return ratingsCache.get(key)!;
  }

  const promise = getTopRatings(page, tab, country);

  if (page === 0 && country === "ALL") {
    ratingsCache.set(
      "Classical-ALL-0",
      promise.then((data) => data.stdRatings)
    );
    ratingsCache.set(
      "Rapid-ALL-0",
      promise.then((data) => data.rapidRatings)
    );
    ratingsCache.set(
      "Blitz-ALL-0",
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

  return { ratings: getCachedRatings(page, tab, country) };
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeControl =
    (searchParams.get("tab") as TimeControl) ?? TimeControl.CLASSICAL;
  const page = Number(searchParams.get("page") || "0");
  const country = searchParams.get("country") || "ALL";

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
  return (
    <>
      <Menu timeControl={timeControl} setTimeControl={setTimeControl} />
      <RatingPage
        timeControl={timeControl}
        page={page}
        setPage={setPage}
        setCountry={setCountry}
      />
    </>
  );
}
