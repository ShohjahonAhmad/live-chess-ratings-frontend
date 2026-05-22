import { type TopRatingsResponse } from "~/api/getTopRatings";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { TimeControl } from "~/types/TypeControl";
import { useLoaderData } from "react-router";

export default function RatingPage({
  timeControl,
  page,
  onPageChange,
}: {
  timeControl: TimeControl;
  page: number;
  onPageChange: (page: number) => void;
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
    <RatingTable
      data={displayData.content}
      columns={columns}
      totalCount={displayData.totalCount}
      page={page}
      onPageChange={onPageChange}
    />
  );
}
