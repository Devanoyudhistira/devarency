import convertToMoney from "@/lib/convert";
import { Item } from "./ui/item";
import Nationbutton from "./nation-button";


type props = {
  money:number;
  currency:string;  
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  nation: string;
  nationname:string
};

export default function Moneyresult({money,currency,onClick,nation,nationname}:props) {
  return (
    <Item className="bg-gray-950 text-white">
      <h1 className="text-xl font-lg font-medium"> currency target : <span className="text-green-500 font-semibold" > {nationname} </span> </h1>
      <div className="flex items-center gap-3 w-full justify-between">
        <h1 className="text-2xl text-green-500 font-black text-shadow-2xs">
          {" "}
          {convertToMoney(money, currency)}{" "}
        </h1>
        <Nationbutton onClick={onClick} nation={nation} />
      </div>
    </Item>
  );
}
