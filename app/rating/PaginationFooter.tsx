import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function PaginationFooter({
  isLoading,
  page,
  onPageChange,
  canPreviousPage,
  canNextPage,
}: {
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}) {
  const [loadingDirection, setLoadingDirection] = useState<
    "next" | "prev" | null
  >(null);

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setLoadingDirection("prev");
          onPageChange(page - 1);
        }}
        disabled={!canPreviousPage || isLoading}
      >
        {isLoading && loadingDirection === "prev" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          "Prev"
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setLoadingDirection("next");
          onPageChange(page + 1);
        }}
        disabled={!canNextPage || isLoading}
      >
        {isLoading && loadingDirection === "next" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          "Next"
        )}
      </Button>
    </div>
  );
}
