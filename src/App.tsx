import { useEffect, useState } from "react";
import axios from "axios";
import Convertcard from "./components/convert-card";
import Tablecurency from "./components/table-currency";
type ExchangeRateResponse = {
  result: string;
  documentation: string;
  us;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
};

export default function StatusBar() {
  const [moneyrecord,setmoneyrecord] = useState<ExchangeRateResponse>()
  useEffect(() => {
    async function getcurrency() {
      try {
        const response: ExchangeRateResponse = (
          await axios.get(
            `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_KEY}/latest/USD`,
          )
        ).data;        
        setmoneyrecord(response)
      } catch (error) {
        console.error(error);
      }
    }
    getcurrency();
  }, []);

  return (
    <div className="w-screen bg-background">    
    <main className="flex mt-6 flex-col gap-5 items-center" >
      <Convertcard/> 
      <Tablecurency moneydata={moneyrecord} />
    </main>
    </div>
  );
}
