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
      <PopoverTrigger>
        <Button variant="outline">
          <Flag />
          Federation
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark:bg-[#1E293B]/30">
        <Input
          placeholder="Search federation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="max-h-80 overflow-y-auto custom-scrollbar border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    name="ALL"
                    onClick={() => setFederation("ALL")}
                    checked={country === "ALL"}
                  />
                </TableHead>
                <TableHead
                  className={`text-left text-sm ${country === "ALL" ? "dark:text-blue-500 text-blue-500" : "text-black"} font-normal  dark:text-[#94A3B8]`}
                >
                  All Federations
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((item) => (
                <TableRow
                  onClick={() => setFederation(item.value)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <Checkbox
                      name={item.label}
                      checked={country === item.value}
                      className={`${country === item.value && "bg-blue-500 border-blue-500 text-white"}`}
                    />
                  </TableCell>
                  <TableCell
                    className={`${item.value === country && "dark:text-blue-500 text-blue-500"}`}
                  >
                    {item.label}
                  </TableCell>
                  <TableCell
                    className={`${item.value === country && "dark:text-blue-500 text-blue-500"}`}
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
