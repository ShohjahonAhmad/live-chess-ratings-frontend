import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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

interface DataTableProps {
  columns: ColumnDef<User>[];
  data: User[];
}

export default function RatingTable({ columns, data }: DataTableProps) {
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      expanded,
    },
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
    },
    meta: {
      handleSubRowToggle,
    },
  });

  return (
    <div className="px-24 py-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by player..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border">
        <Table className="w-full dark:bg-[#1E293B]/30">
          <TableHeader>
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
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
