import convertToMoney from "@/lib/convert";
import { Item } from "./ui/item";
import Nationbutton from "./nation-button";

export default function Moneyresult() {
  return (
    <Item className="bg-gray-950 text-white">
      <h1 className="text-xl font-lg font-medium"> currency target </h1>
      <div className="flex items-center gap-3 w-full justify-between">
        <h1 className="text-2xl text-green-500 font-black text-shadow-2xs">
          {" "}
          {convertToMoney(125000, "USD")}{" "}
        </h1>
        <Nationbutton nation="USD" />
      </div>
    </Item>
  );
}
