import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function SkeletonTable() {
  return (
    <div className="px-24 py-6">
      <div className="overflow-hidden rounded-2xl border">
        <Table className="w-full dark:bg-[#1E293B]/30">
          <TableHeader>
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex w-full items-center justify-between">
                  <div className="h-8 w-64 animate-pulse rounded-md bg-[#CBD5E1]/40 dark:bg-[#334155]" />

                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                    <div className="h-4 w-32 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
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
            {Array.from({ length: 20 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 w-6 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>

                <TableCell>
                  <div className="h-4 w-40 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>

                <TableCell>
                  <div className="mx-auto h-4 w-10 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>

                <TableCell>
                  <div className="mx-auto h-4 w-8 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>

                <TableCell>
                  <div className="mx-auto h-4 w-14 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>

                <TableCell>
                  <div className="ml-auto h-4 w-12 animate-pulse rounded bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>

                <TableCell>
                  <div className="ml-auto h-5 w-5 animate-pulse rounded-full bg-[#CBD5E1]/40 dark:bg-[#334155]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
