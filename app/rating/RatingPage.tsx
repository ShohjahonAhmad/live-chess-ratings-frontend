import { type Content, type TopRatingsResponse } from "~/api/getTopRatings";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { TimeControl } from "~/types/TypeControl";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import SkeletonRows from "./SkeletenRows";
import type { SortBy } from "~/types/Sorting";

export default function RatingPage({
  page,
  setPage,
  setCountry,
  search,
  setSearch,
  setSort,
}: {
  timeControl: TimeControl;
  page: number;
  setPage: (page: number) => void;
  setCountry: (country: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSort: (sorting: SortBy) => void;
}) {
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
              page={page}
              setPage={setPage}
              setCountry={setCountry}
              search={search}
              setSearch={setSearch}
              setSort={setSort}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}
