import { ChevronDown, Flag } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { countries } from "~/utils/data/countries";
import { federationToFlag } from "~/utils/data/flags";
import fidePng from "/fide.png";

export default function CountryFilter({
  setCountry,
}: {
  setCountry: (country: string) => void;
}) {
  const [input, setInput] = useState<string>("");
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country") || "ALL";
  const filteredCountries =
    input === ""
      ? countries
      : countries.filter((country) =>
          country.label.toLowerCase().includes(input.toLowerCase())
        );

  function setFederation(value: string) {
    if (value == country) {
      setCountry("ALL");
    } else {
      setCountry(value);
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Flag />
          Federation
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3 overflow-hidden dark:bg-[#1E293B]/30">
        <Input
          placeholder="Search federation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="max-h-80 overflow-y-auto custom-scrollbar border rounded-md">
          <Table>
            <TableHeader>
              <TableRow
                onClick={() => setFederation("ALL")}
                className="cursor-pointer "
              >
                <TableHead>
                  <Checkbox name="ALL" checked={country === "ALL"} />
                </TableHead>
                <TableHead
                  className={`text-left hover:text-blue-500 dark:hover:text-blue-500 text-sm ${country === "ALL" ? "dark:text-blue-500 text-blue-500" : "text-black"} font-normal  dark:text-[#94A3B8]`}
                >
                  All Federations
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((item) => (
                <TableRow
                  key={item.value}
                  onClick={() => setFederation(item.value)}
                  className="cursor-pointer hover:text-blue-500 group"
                >
                  <TableCell>
                    <Checkbox
                      name={item.label}
                      checked={country === item.value}
                      className={`${country === item.value && "bg-blue-500 border-blue-500 text-white"}`}
                    />
                  </TableCell>
                  <TableCell
                    className={`flex gap-1 ${item.value === country && "dark:text-blue-500 text-blue-500"} group-hover:text-blue-500 dark:group-hover:text-blue-500`}
                  >
                    {item.value === "FID" ? (
                      <img src={fidePng} className="w-5 h-4" />
                    ) : (
                      <span
                        className={`fi fi-${federationToFlag[item.value]}`}
                      />
                    )}
                    {item.label}
                  </TableCell>
                  <TableCell
                    className={`${item.value === country && "dark:text-blue-500 text-blue-500"} group-hover:text-blue-500 dark:group-hover:text-blue-500`}
                  >
                    {item.value}
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
