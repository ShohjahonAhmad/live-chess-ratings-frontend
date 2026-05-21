import { type TopRatingsResponse } from "~/api/getTopRatings";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { TimeControl } from "~/types/TypeControl";
import { useLoaderData } from "react-router";

export default function RatingPage({
  timeControl,
}: {
  timeControl: TimeControl;
}) {
  const data = useLoaderData() as TopRatingsResponse;

  const displayData =
    data &&
    (timeControl === TimeControl.BLITZ
      ? data.blitzRatings
      : timeControl === TimeControl.RAPID
        ? data.rapidRatings
        : data.stdRatings);
  return (
    <div className="dark:bg-[#0f172a]">
      <RatingTable data={displayData} columns={columns} />
    </div>
  );
}
