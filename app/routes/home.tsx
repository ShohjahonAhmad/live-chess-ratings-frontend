import type { Route } from "./+types/home";
import Menu from "../menu/Menu";
import { getTopRatings } from "~/api/getTopRatings";
import RatingPage from "~/rating/RatingPage";
import { useState } from "react";
import { TimeControl } from "~/types/TypeControl";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Chess Rankings" },
    { name: "description", content: "Welcome to World Chess Rankings!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return await getTopRatings();
}

export default function Home() {
  const [timeControl, setTimeControl] = useState(TimeControl.CLASSICAL);
  return (
    <>
      <Menu timeControl={timeControl} setTimeControl={setTimeControl} />
      <RatingPage timeControl={timeControl} />
    </>
  );
}
