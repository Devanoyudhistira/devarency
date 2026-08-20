import { ArrowDownUp, DollarSign } from "lucide-react";
import Moneyinput from "./money-input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Moneyresult from "./money-result";
import { useEffect, useState } from "react";
import axios from "axios";
import convertToMoney from "@/lib/convert";
import Nationdialog from "./nationdialog";

type moneypair = {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
};

export default function Convertcard() {
  const [moneyrecord, setmoneyrecord] = useState<moneypair>();
  const [moneynominee, setmoneynominee] = useState<number>(0);
  const [opennation, setopennation] = useState<boolean>(false);
  const [openlastnation, setopenlastnation] = useState<boolean>(false);
  const [firstnation, setfirstnation] = useState<string>("IDR");
  const [firstfullnation, setfirstfullnation] = useState<string>("Indonesia");
  const [lastfullnation, setlastfullnation] = useState<string>("America");
  const [lastnation, setlastnation] = useState<string>("USD");
  useEffect(() => {
    async function getcurrency() {
      try {
        const response: moneypair = (
          await axios.get(
            `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_KEY}/pair/${firstnation}/${lastnation}`,
          )
        ).data;
        setmoneyrecord(response);
      } catch (error) {
        console.error(error);
      }
    }
    getcurrency();
  }, [firstnation, lastnation]);

  console.log(lastnation);
  console.log(firstnation);
  return (
    <Card className="bg-slate-800 shadow-[8px_8px_0_black] w-[95%] flex flex-col items-center ">
      <Nationdialog
        changefullnation={setfirstfullnation}
        changenation={setfirstnation}
        onchange={setopennation}
        opencondition={opennation}
      />
      <Nationdialog
        changefullnation={setlastfullnation}
        changenation={setlastnation}
        onchange={setopenlastnation}
        opencondition={openlastnation}
      />
      <h1 className="text-primary text-3xl font-black flex items-center gap-2 ">
        {" "}
        <DollarSign className="size-8" /> Convert Money{" "}
      </h1>
      <CardContent className="flex flex-col lg:flex-row gap-4 items-center">
        <Moneyinput
          nationname={firstfullnation}
          nation={firstnation}
          onClick={() => setopennation(!opennation)}
          onchange={(e) =>
            setmoneynominee(Number(e.currentTarget.value.replace(/[.,]/g, "")))
          }
          inputname="base currency"
        />
        <Button
          variant="default"
          size="icon-lg"
          className={`rounded-full p-4 `}
        >
          <ArrowDownUp color="white" className="size-6" />
        </Button>
        {moneyrecord?.conversion_rate && (
          <Moneyresult
            nation={lastnation}
            onClick={() => setopenlastnation(!opennation)}
            money={moneyrecord?.conversion_rate * moneynominee}
            currency={moneyrecord?.target_code}
            nationname={lastfullnation}
          />
        )}
      </CardContent>
      {moneyrecord?.target_code && (
        <CardFooter className="text-md text-gray-500 font-semibold">
          {" "}
          {convertToMoney(moneynominee, moneyrecord?.base_code)}{" "}
          {moneyrecord?.base_code} ={" "}
          {/* {moneyrecord?.conversion_rate * moneynominee} */}
          {convertToMoney(
            moneyrecord?.conversion_rate * moneynominee,
            moneyrecord?.target_code,
          )}{" "}
        </CardFooter>
      )}
    </Card>
  );
}
