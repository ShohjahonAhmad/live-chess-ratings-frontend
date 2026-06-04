import Info from "~/utils/svgs/Info";
import { Input } from "~/components/ui/input";
import { useDarkMode } from "~/contexts/DarkModeContext";
import CountryFilter from "./CountryFilter";
import { Switch } from "~/components/ui/switch";

export default function RatingToolBar({
  setCountry,
  search,
  setSearch,
  onlyActive,
  setOnlyActive,
}: {
  setCountry: (country: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onlyActive: string;
  setOnlyActive: (active: string) => void;
}) {
  const { isDark } = useDarkMode();
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by name or FIDE ID..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-1/5 min-w-64"
        />
        <CountryFilter setCountry={setCountry} />
        <span>Active Only</span>
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
          Updated in real-time
        </h2>
      </div>
    </div>
  );
}
