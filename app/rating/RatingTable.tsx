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
  });

  return (
    <div className="px-24 py-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by countries..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="w-[5%]">#</TableHead>
              <TableHead className="w-[50%] text-left">Player</TableHead>
              <TableHead className="w-[10%]">Fed</TableHead>
              <TableHead className="w-[10%]">Age</TableHead>
              <TableHead className="w-[10%]">Rating</TableHead>
              <TableHead className="w-[10%]">Change</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell, idx) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: idx === 1 ? "60%" : "auto" }}
                          className="h-[41px]"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && row.original.recentGames && (
                      <TableRow>
                        <TableCell colSpan={columns.length}>
                          <SubRows recentGames={row.original.recentGames} />
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
