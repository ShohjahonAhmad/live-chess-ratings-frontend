import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import useRatingSearchParams from "~/hooks/useRatingSearchParams";
import { SortBy, SortDirection } from "~/types/Sorting";

export default function SortingButton({
  text,
  individualSortBy,
}: {
  text: string;
  individualSortBy: SortBy;
}) {
  const { sortBy, setSortBy, sortDirection } = useRatingSearchParams();

  return (
    <Button
      variant="ghost"
      className={`text-xs ${sortBy === individualSortBy ? "text-blue-500" : "text-[#64748B] dark:text-[#94A3B8]"} px-0 transition-all duration-200`}
      onClick={() => setSortBy(individualSortBy)}
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
