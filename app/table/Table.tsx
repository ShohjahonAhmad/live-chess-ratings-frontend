import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getStdRatings } from "~/api/getStdRatings";

type User = {
  fideId?: number;
  name: string;
  rating: number;
  ratingChange: number;
  count: number;
};

export default function Table() {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    getStdRatings().then((data) => setData(data));
  }, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.fideId),
  });

  return (
    <table className="w-full text-left">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2 border-b border-slate-700">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-slate-800">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.display({
    id: "rank",
    header: "#",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
  }),
  columnHelper.accessor("ratingChange", {
    header: "Change",
  }),
  columnHelper.accessor("count", {
    header: "Games",
  }),
];
