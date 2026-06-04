import { type Content, type TopRatingsResponse } from "~/api/getTopRatings";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { TimeControl } from "~/types/TypeControl";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import SkeletonRows from "./SkeletenRows";
import type { SortBy, SortDirection } from "~/types/Sorting";

export default function RatingPage({
  page,
  setPage,
  setCountry,
  search,
  setSearch,
  sortBy,
  sortDirection,
  setSort,
  onlyActive,
  setOnlyActive,
}: {
  timeControl: TimeControl;
  page: number;
  setPage: (page: number) => void;
  setCountry: (country: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortBy;
  sortDirection: SortDirection;
  setSort: (sorting: SortBy) => void;
  onlyActive: string;
  setOnlyActive: (active: string) => void;
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
              sortBy={sortBy}
              sortDirection={sortDirection}
              setSort={setSort}
              onlyActive={onlyActive}
              setOnlyActive={setOnlyActive}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}
