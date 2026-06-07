import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import useRatingSearchParams from "~/hooks/useRatingSearchParams";

export default function PaginationFooter({
  isLoading,
  canPreviousPage,
  canNextPage,
}: {
  isLoading: boolean;
  canPreviousPage: boolean;
  canNextPage: boolean;
}) {
  const [loadingDirection, setLoadingDirection] = useState<
    "next" | "prev" | null
  >(null);
  const { page, setPage } = useRatingSearchParams();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setLoadingDirection("prev");
          setPage(page - 1);
        }}
        disabled={!canPreviousPage || isLoading}
      >
        {isLoading && loadingDirection === "prev" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          t("pagination.previous")
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setLoadingDirection("next");
          setPage(page + 1);
        }}
        disabled={!canNextPage || isLoading}
      >
        {isLoading && loadingDirection === "next" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          t("pagination.next")
        )}
      </Button>
    </div>
  );
}
