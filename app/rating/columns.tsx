import { type ColumnDef } from "@tanstack/react-table";
import type { User } from "~/types/User";

import { ArrowUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import RatingGain from "~/utils/svgs/RatingGain";
import RatingLoss from "~/utils/svgs/RatingLoss";

export const columns: ColumnDef<User>[] = [
  {
    id: "rank",
    header: "#",
    cell: (info) => {
      const rank =
        info.table
          .getCoreRowModel()
          .rows.findIndex((row) => row.id == info.row.id) + 1;

      return <div className="text-[#64748B] leading-5 text-center">{rank}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Player</div>,
    cell: (info) => {
      return (
        <div className="text-left text-sm font-bold leading-3.5">
          {getFullName(info.getValue() as string)}
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: (info) => {
      return (
        <div className="text-[#64748B] text-xs font-medium leading-4 text-center">
          {info.getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: () => <div className="text-center">Age</div>,
    cell: (info) => {
      const age = new Date().getFullYear() - (info.getValue() as number);
      return (
        <div className="text-[#64748B] text-sm leading-5 text-center">
          {age}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: (info) => (
      <div className="font-black leading-5 text-sm text-center">
        {info.getValue() as number}
      </div>
    ),
  },
  {
    accessorKey: "ratingChange",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          className="text-xs"
        >
          Change
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const ratingChange = (info.getValue() as number) || 0;
      if (ratingChange === 0)
        return (
          <div className="text-[#64748B] text-xs font-bold leading-4 text-right pr-4">
            {ratingChange}
          </div>
        );
      if (ratingChange > 0)
        return (
          <div className="flex items-center justify-end gap-1 text-[#10B981] text-xs font-bold leading-4 text-right pr-4">
            <RatingGain />
            <span>+ {ratingChange}</span>
          </div>
        );
      return (
        <div className="flex items-center justify-end text-[#EF4444] gap-1 text-xs font-bold leading-4 text-right pr-4">
          <RatingLoss />
          <span>- {Math.abs(ratingChange)}</span>
        </div>
      );
    },
  },
];

function getFullName(name: string) {
  const arr = name.split(",");
  const firstName = arr[1] != undefined ? arr[1] : "";
  const lastName = arr[0] != undefined ? arr[0] : "";
  const fullName = (firstName + " " + lastName).trim();

  return fullName;
}
