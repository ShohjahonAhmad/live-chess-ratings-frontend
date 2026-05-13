import type { Route } from "./+types/home";
import Menu from "../menu/Menu";
import RatingPage from "~/rating/RatingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Chess Rankings" },
    { name: "description", content: "Welcome to World Chess Rankings!" },
  ];
}

export default function Home() {
  return (
    <>
      <Menu />
      <RatingPage />
    </>
  );
}
