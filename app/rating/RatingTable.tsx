import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnDef,
  getFilteredRowModel,
  type ColumnFiltersState,
  getExpandedRowModel,
  type ExpandedState,
  type Row,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { User } from "~/types/User";
import SubRows from "./SubRows";
import Info from "~/utils/svgs/Info";
import { useDarkMode } from "~/contexts/DarkModeContext";

interface DataTableProps {
  columns: ColumnDef<User>[];
  data: User[];
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export default function RatingTable({
  columns,
  data,
  page,
  totalCount,
  onPageChange,
}: DataTableProps) {
  const { isDark } = useDarkMode();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [closingRows, setClosingRows] = useState<Set<string>>(new Set());

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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      expanded,
      pagination: {
        pageIndex: page,
        pageSize: 100,
      },
    },
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
                <div className="flex w-full items-center justify-between">
                  <Input
                    placeholder="Filter by player..."
                    value={
                      (table.getColumn("name")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("name")
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-1/5 min-w-64"
                  />
                  <div className="flex gap-1.5 items-center">
                    <Info stroke={isDark ? "#94A3B8" : "#64748B"}></Info>
                    <h2 className="text-[#64748B] dark:text-[#94A3B8]">
                      Updated in real-time
                    </h2>
                  </div>
                </div>
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
          <TableBody>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
