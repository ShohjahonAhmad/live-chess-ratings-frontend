import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { SortBy, SortDirection } from "~/types/Sorting";
import { TimeControl } from "~/types/TypeControl";

export default function useRatingSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const timeControl =
    (searchParams.get("tab") as TimeControl) ?? TimeControl.CLASSICAL;
    const page = Number(searchParams.get("page") || "0");

    const [search, setSearch] = useState<string>(
        searchParams.get("search") || ""
      );

    const country = searchParams.get("country") || "ALL";
    const sortBy = (searchParams.get("sort") as SortBy) || SortBy.RATING;
    const sortDirection =
        (searchParams.get("dir") as SortDirection) || SortDirection.DESC;
    const onlyActive =
        (searchParams.get("onlyActive") === "false" && "false") || "true";

    useEffect(() => {
        const delayedParam = setTimeout(() => {
            setSearchParams((prev) => {
            if (search.trim()) {
                prev.set("search", search.trim());
            } else {
                prev.delete("search");
            }
    
            prev.set("page", "0");
    
            return prev;
            });
        }, 400);
    
        return () => clearTimeout(delayedParam);
    }, [search]);
    
    const setOnlyActive = (active: string) => {
    setSearchParams((prev) => {
        prev.set("onlyActive", active);

        return prev;
    });
    };

    const setCountry = (country: string) => {
    setSearchParams((prev) => {
        prev.set("country", country);
        prev.set("page", "0");

        return prev;
    });
    };

    const setTimeControl = (tc: TimeControl) => {
    setSearchParams(
        (prev) => {
        prev.set("tab", tc);
        prev.set("page", "0");

        return prev;
        },
        { preventScrollReset: true }
    );
    };

    const setPage = (newPage: number) => {
    setSearchParams(
        (prev) => {
        prev.set("page", String(newPage));

        return prev;
        },
        { preventScrollReset: true }
    );
    };

    const setSortBy = (sorting: SortBy) => {
    setSearchParams((prev) => {
        if (sortBy !== sorting) {
        prev.set("page", "0");
        prev.set("dir", SortDirection.DESC);
        } else {
        prev.set(
            "dir",
            sortDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC
        );
        }

        prev.set("sort", sorting);

        return prev;
    });
    };

    return {
        timeControl,
        setTimeControl,
        page,
        setPage,
        country,
        setCountry,
        search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        onlyActive,
        setOnlyActive,
    }
}