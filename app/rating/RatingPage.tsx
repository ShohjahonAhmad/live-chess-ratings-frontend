import { type Content } from "~/api/getTopRatings";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import SkeletonRows from "./SkeletenRows";

export default function RatingPage() {
  const { ratings } = useLoaderData() as {
    ratings: Promise<Content>;
  };

  return (
    <Suspense fallback={<SkeletonRows />}>
      <Await resolve={ratings}>
        {(data) => {
          return (
            <RatingTable
              data={data.content}
              columns={columns}
              totalCount={data.totalCount}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}
