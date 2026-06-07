import Info from "~/utils/svgs/Info";
import { Input } from "~/components/ui/input";
import { useDarkMode } from "~/contexts/DarkModeContext";
import CountryFilter from "./CountryFilter";
import { Switch } from "~/components/ui/switch";
import useRatingSearchParams from "~/hooks/useRatingSearchParams";
import { useTranslation } from "react-i18next";

export default function RatingToolBar() {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const { search, setSearch, setCountry, onlyActive, setOnlyActive } =
    useRatingSearchParams();
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <Input
          placeholder={t("toolbar.searchPlaceholder")}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-1/5 min-w-64"
        />
        <CountryFilter setCountry={setCountry} />
        <span>{t("toolbar.activeOnly")}</span>
        <Switch
          checked={onlyActive === "true"}
          onCheckedChange={() =>
            setOnlyActive(onlyActive === "true" ? "false" : "true")
          }
        />
      </div>

      <div className="flex gap-1.5 items-center">
        <Info stroke={isDark ? "#94A3B8" : "#64748B"} />
        <h2 className="text-[#64748B] dark:text-[#94A3B8]">
          {t("toolbar.updatedRealTime")}
        </h2>
      </div>
    </div>
  );
}
