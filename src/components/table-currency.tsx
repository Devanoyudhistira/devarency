import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";
import { SquareOff } from "lucide-react";
import convertToMoney from "@/lib/convert";
type Country = {
  names: {
    common: string;
    official: string;
  };

  codes: {
    alpha_2: string;
    alpha_3: string;
  };

  flag: {
    emoji: string;
    url_png: string;
    url_svg: string;
  };

  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];

  region: string;
  subregion: string;
};

type CountryResponse = {
  data: {
    objects: Country[];
  };
};

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
  const [countries, setCountries] = useState<Country[]>([]);
  console.log(countries.map((e) => e.currencies[0]?.code));
  console.log(moneydata?.conversion_rates);

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await axios.get<CountryResponse>(
          "https://api.restcountries.com/countries/v5",
          {
            headers: {
              Authorization: import.meta.env.VITE_EXCHANGE_COUNTRY_KEY,
            },
          },
        );
        setCountries(response.data.data.objects);
      } catch (error) {
        console.error(error);
      }
    }

    getCountries();
  }, []);

  // if (moneydata?.conversion_rates && countries[0]?.currencies[0]?.code) {
  //   console.log(
  //     Object.entries(moneydata.conversion_rates)
  //       .filter(
  //         ([currencies]) => currencies === countries[0].currencies[0]?.code,
  //       )
  //       .map(([currencies, rates]) => currencies),
  //   );
  // }

  return (
    <Card className="w-[80%] text-white bg-slate-950 px-4 py-2">
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
            <TableHead className="">currency code</TableHead>
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
              <TableCell>{e.currencies[0]?.name || "unknown"}</TableCell>
              <TableCell>{e.currencies[0]?.code || "unknown"}</TableCell>
              <TableCell>
                {Object.entries(moneydata.conversion_rates)
                  .filter(
                    ([currencies]) =>
                      currencies === countries[i].currencies[0]?.code,
                  )
                  .map(([currencies, rates]) =>
                    convertToMoney(rates, currencies),
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
