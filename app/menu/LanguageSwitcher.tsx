import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import i18n from "~/i18n";
import { languages } from "../../config/languages";
import { Table, TableBody, TableRow, TableCell } from "~/components/ui/table";

export default function LanguageSwitcher() {
  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="border-slate-600 data-[state=open]:bg-[#0f172a]
 dark:bg-[#0f172a]/50 dark:border-slate-600 dark:text-white text-white text-xs flex"
        >
          <span className="text-[8px] font-bold translate-y-px">
            {currentLanguage.countryCode}
          </span>
          {currentLanguage.langCode}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-1 max-w-40 p-0 shadow-none ring-0 bg-[#0f172a] border-slate-600">
        <div className="max-h-80 bg-transparent">
          <Table>
            <TableBody>
              {Object.entries(languages).map(([lang, info]) => (
                <TableRow
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`group cursor-pointer text-[#f8fafc] hover:bg-[#3b82f6]/10  hover:text-[#3b82f6] border-0  ${
                    currentLanguage.langCode === info.langCode
                      ? "bg-[#3b82f6]/10 text-[#3b82f6] dark:text-[#3b82f6]"
                      : "bg-[#1e293b]"
                  }`}
                >
                  <TableCell
                    className={`dark:group-hover:text-[#3b82f6] dark:text-white ${currentLanguage.langCode === info.langCode && "dark:text-[#3b82f6]"}`}
                  >
                    {info.countryCode}
                  </TableCell>
                  <TableCell
                    className={`dark:group-hover:text-[#3b82f6] dark:text-white ${currentLanguage.langCode === info.langCode && "dark:text-[#3b82f6]"}`}
                  >
                    {info.name}
                  </TableCell>
                  <TableCell className="">
                    {currentLanguage.langCode === info.langCode && (
                      <Check className="h-4 w-4 text-[#3b82f6]" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PopoverContent>
    </Popover>
  );
}
