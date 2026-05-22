import { type TopRatingsResponse } from "~/api/getTopRatings";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { TimeControl } from "~/types/TypeControl";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import SkeletonRows from "./SkeletenRows";

export default function RatingPage({
  timeControl,
  page,
  onPageChange,
}: {
  timeControl: TimeControl;
  page: number;
  onPageChange: (page: number) => void;
}) {
  // const loaderData = useLoaderData() as TopRatingsResponse;

  const { ratings } = useLoaderData() as {
    ratings: Promise<TopRatingsResponse>;
  };

  return (
    <Suspense fallback={<SkeletonRows />}>
      <Await resolve={ratings}>
        {(loaderData) => {
          const data =
            loaderData &&
            (timeControl === TimeControl.BLITZ
              ? loaderData.blitzRatings
              : timeControl === TimeControl.RAPID
                ? loaderData.rapidRatings
                : loaderData.stdRatings);
          return (
            <RatingTable
              data={data.content}
              columns={columns}
              totalCount={data.totalCount}
              page={page}
              onPageChange={onPageChange}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}
