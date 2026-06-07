import type { RecentGames } from "~/api/getTopRatings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import Draw from "./results/Draw";
import Win from "./results/Win";
import Loss from "./results/Loss";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { uz, enGB, ru } from "date-fns/locale";

const localeMap = {
  uz: uz,
  en: enGB,
  ru: ru,
};

export default function SubRows({
  recentGames,
}: {
  recentGames: RecentGames[];
}) {
  const { t, i18n } = useTranslation();
  const headerClasses =
    "px-4 py-1.5 text-[#64748B] font-semibold text-xs dark:bg-[#0f172a]/50";

  return (
    <div className="px-2 md:px-12 py-4">
      <div className="rounded-2xl border overflow-hidden shadow-l">
        <Table>
          <TableHeader className="border-b">
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className={`text-left ${headerClasses} w-[10%]`}>
                {t("gamesTable.date")}
              </TableHead>
              <TableHead className={`text-left ${headerClasses} w-[25%]`}>
                {t("gamesTable.tournament")}
              </TableHead>
              <TableHead className={`text-left ${headerClasses} w-[25%]`}>
                {t("gamesTable.opponent")}
              </TableHead>
              <TableHead className={`text-right ${headerClasses} w-[15%]`}>
                {t("gamesTable.opponentRating")}
              </TableHead>
              <TableHead className={`text-center ${headerClasses} w-[15%]`}>
                {t("gamesTable.result")}
              </TableHead>
              <TableHead className={`text-right ${headerClasses} w-[15%]`}>
                {t("gamesTable.ratingChange")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="dark:bg-[#0f172a]">
            {recentGames.map((game) => (
              <TableRow
                key={game.id}
                className="border-b last:border-0 bg-[#F1F5F9]"
              >
                <TableCell className="text-[#64748B] text-xs leading-4 px-4 py-2">
                  {format(new Date(game.date), "d MMMM yyyy", {
                    locale: localeMap[i18n.language as keyof typeof localeMap],
                  })}
                </TableCell>
                <TableCell className="px-4 py-2 font-medium text-xs leading-4 truncate max-w-0 dark:text-[#F8FAFC]">
                  {game.tournament}
                </TableCell>
                <TableCell className="px-4 py-2 text-xs leading-4 truncate dark:text-[#F8FAFC]">
                  {game.opponentName}
                </TableCell>
                <TableCell className="px-4 py-2 text-right text-[#64748B] text-xs">
                  {game.opponentRating}
                </TableCell>
                <TableCell className="px-4 py-2 flex justify-center">
                  {game.result == "DRAW" ? (
                    <Draw />
                  ) : game.change > 0 ? (
                    <Win score={`${game.result === "WIN" ? "1-0" : "0-1"}`} />
                  ) : (
                    <Loss score={`${game.result === "WIN" ? "1-0" : "0-1"}`} />
                  )}
                </TableCell>
                <TableCell
                  className={`px-4 py-2 font-bold leading-4 text-xs text-right ${game.change > 0 ? "dark:text-[#10B981] text-[#10B981]" : game.change < 0 ? "dark:text-[#EF4444] text-[#EF4444]" : "dark:text-[#64748B] text-[#64748B]"}`}
                >
                  {game.change > 0 ? "+" : game.change === 0 ? "" : "-"}{" "}
                  {Math.abs(game.change)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
