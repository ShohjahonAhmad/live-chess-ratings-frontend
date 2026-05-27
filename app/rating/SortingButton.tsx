import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SortBy, SortDirection } from "~/types/Sorting";

export default function SortingButton({
  text,
  individualSortBy,
  sortBy,
  sortDirection,
  setSort,
}: {
  text: string;
  individualSortBy: SortBy;
  sortBy: SortBy;
  sortDirection: SortDirection;
  setSort: (sorting: SortBy) => void;
}) {
  return (
    <Button
      variant="ghost"
      className={`text-xs ${sortBy === individualSortBy ? "text-blue-500" : "text-[#64748B] dark:text-[#94A3B8]"} px-0`}
      onClick={() => setSort(individualSortBy)}
    >
      {text}
      {sortBy === individualSortBy ? (
        sortDirection === SortDirection.ASC ? (
          <ArrowUp className="h-2 w-2" />
        ) : (
          <ArrowDown className="h-2 w-2" />
        )
      ) : (
        <ArrowUpDown className="h-2 w-2" />
      )}
    </Button>
  );
}
