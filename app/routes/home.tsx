import type { Route } from "./+types/home";
import Menu from "../menu/Menu";
import { getTopRatings } from "~/api/getTopRatings";
import RatingPage from "~/rating/RatingPage";
import { TimeControl } from "~/types/TypeControl";
import { useSearchParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Chess Rankings" },
    { name: "description", content: "Welcome to World Chess Rankings!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page")) ?? 0;
  const tab = (searchParams.get("tab") as TimeControl) ?? TimeControl.CLASSICAL;
  return await getTopRatings(page, tab);
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeControl =
    (searchParams.get("tab") as TimeControl) ?? TimeControl.CLASSICAL;
  const page = Number(searchParams.get("page") ?? 0);

  const setTimeControl = (tc: TimeControl) => {
    setSearchParams({ tab: tc, page: "0" });
  };

  const onPageChange = (newPage: number) => {
    setSearchParams({ tab: timeControl, page: String(newPage) });
  };
  return (
    <>
      <Menu timeControl={timeControl} setTimeControl={setTimeControl} />
      <RatingPage
        timeControl={timeControl}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
}
