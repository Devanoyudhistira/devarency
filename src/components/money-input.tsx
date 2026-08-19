
import Nationbutton from "./nation-button";
import { Input } from "./ui/input";
import { Item } from "./ui/item";
import { NumericFormat } from "react-number-format";
export default function Moneyinput({ inputname }: { inputname: string }) {
  return (
    <Item className="bg-gray-950 text-white" >
      <h1 className="text-xl font-lg flex items-center gap-2 font-medium"> {inputname} </h1>
      <div className="flex items-center gap-3 w-full justify-between">
        <NumericFormat
        customInput={Input}
        placeholder="insert nominee here"
        className="border border-primary ring-0 outline-0 text-2xl font-black"
          thousandSeparator="."
          decimalSeparator=","
          name="harga"
          id="price"
        />
       <Nationbutton nation="IDR" />
      </div>      
    </Item>
  );
}
