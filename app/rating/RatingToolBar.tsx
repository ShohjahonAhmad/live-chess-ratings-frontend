import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxContent,
} from "~/components/ui/combobox";
import Info from "~/utils/svgs/Info";
import { Input } from "~/components/ui/input";
import { useDarkMode } from "~/contexts/DarkModeContext";
import { countries, type Country } from "~/utils/data/countries";

export default function RatingToolBar({
  setCountry,
  search,
  setSearch,
}: {
  setCountry: (country: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { isDark } = useDarkMode();
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-4">
        <Input
          placeholder="Search by name or FIDE ID..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-1/5 min-w-64"
        />
        <Combobox items={countries}>
          <ComboboxInput placeholder="Select a country" />
          <ComboboxContent>
            <ComboboxEmpty>No countries found.</ComboboxEmpty>
            <ComboboxList>
              {(country: Country) => (
                <ComboboxItem
                  key={country.value}
                  value={country.value}
                  onClick={() => setCountry(country.value)}
                >
                  {country.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
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
