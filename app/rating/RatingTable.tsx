import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  type Row,
  type ColumnDef,
  type ExpandedState,
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
} from "~/components/ui/table";
import SubRows from "./SubRows";
import type { User } from "~/types/User";
import RatingToolBar from "./RatingToolBar";
import { useNavigation } from "react-router";
import PaginationFooter from "./PaginationFooter";

interface DataTableProps {
  columns: ColumnDef<User>[];
  data: User[];
  page: number;
  totalCount: number;
  setPage: (page: number) => void;
  setCountry: (country: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function RatingTable({
  columns,
  data,
  page,
  totalCount,
  setPage,
  setCountry,
  search,
  setSearch,
}: DataTableProps) {
  const PAGE_SIZE = 100;
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [closingRows, setClosingRows] = useState<Set<string>>(new Set());

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const handleSubRowToggle = (row: Row<User>) => {
    if (row.getIsExpanded()) {
      setClosingRows((prev) => new Set(prev).add(row.id));
      setTimeout(() => {
        row.toggleExpanded();
        setClosingRows((prev) => {
          const next = new Set(prev);
          next.delete(row.id);
          return next;
        });
      }, 500);
    } else {
      row.toggleExpanded();
    }
  };

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row) => !!row.original.recentGames,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
      pagination: {
        pageIndex: page,
        pageSize: PAGE_SIZE,
      },
    },
    onExpandedChange: setExpanded,
    manualPagination: true,
    rowCount: totalCount,

    meta: {
      handleSubRowToggle,
    },
  });

  return (
    <div className="px-24 py-6">
      <div className="overflow-hidden rounded-2xl border">
        <Table className="w-full dark:bg-[#1E293B]/30">
          <TableHeader>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <RatingToolBar
                  setCountry={setCountry}
                  search={search}
                  setSearch={setSearch}
                />
              </TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableHead className="w-[5%]">#</TableHead>
              <TableHead className="w-[50%] text-left">Player</TableHead>
              <TableHead className="w-[10%]">Fed</TableHead>
              <TableHead className="w-[10%]">Age</TableHead>
              <TableHead className="w-[10%]">Rating</TableHead>
              <TableHead className="w-[10%] text-right">Change</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            className={`transition-opacity duration-200 ${isLoading ? "opacity-60" : "opacity-100"}`}
          >
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      className={`transition-all duration-300 ease-in-out ${row.getIsExpanded() ? "dark:bg-[#3B82F6]/10 bg-[#3B82F6]/5" : ""}`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="h-[41px]">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {(row.getIsExpanded() || closingRows.has(row.id)) &&
                      row.original.recentGames && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="bg-[#3B82F6]/5"
                          >
                            <div
                              style={{
                                overflow: "hidden",
                                animation: `${closingRows.has(row.id) ? "collapse" : "expand"} 500ms ease-out`,
                              }}
                            >
                              <SubRows recentGames={row.original.recentGames} />
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationFooter
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
      />
    </div>
  );
}
