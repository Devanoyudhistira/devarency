import { useEffect } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {  SquareOff } from "lucide-react";
import convertToMoney from "@/lib/convert";
import { useCountryStore } from "@/model/countrystore";

type ExchangeRateResponse = {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rates: Record<string, number>;
};

export default function Tablecurency({
  moneydata,
}: {
  moneydata: ExchangeRateResponse;
}) {
  const countries = useCountryStore((state) => state.countries);
  const getCountries = useCountryStore((state) => state.getCountries);  

  useEffect(() => {
    getCountries();
  }, [getCountries]);  

  return (
    <Card className="w-[98%] text-white bg-slate-950 px-4 py-2">
      <h1 className="text-3xl font-black text-green-600">
        {" "}
        currency dashboard{" "}
      </h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="*:text-white">
            <TableHead className="text-green-500">Flag</TableHead>
            <TableHead>Common Name</TableHead>
            <TableHead>Official Name</TableHead>
            <TableHead className="">currencies</TableHead>
            <TableHead className="">conversion_rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.map((e, i) => (
            <TableRow>
              <TableCell className="font-medium">
                {e.flag.url_png ? (
                  <img
                    src={e.flag.url_png}
                    alt={` flag`}
                    width={20}
                    height={20}
                  />
                ) : (
                  <SquareOff />
                )}
              </TableCell>
              <TableCell className="w-5"> {e.names.common} </TableCell>
              <TableCell className="w-5"> {e.names.official} </TableCell>
              <TableCell>{e.currencies[0]?.code || "unknown"}</TableCell>
              <TableCell>
                {moneydata.conversion_rates &&
                  typeof moneydata.conversion_rates === "object" &&
                  Object.entries(moneydata.conversion_rates)
                    .filter(
                      ([currency]) =>
                        currency === countries[i].currencies[0]?.code,
                    )
                    .map(([currency, rates]) =>
                      convertToMoney(rates, currency),
                    )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
