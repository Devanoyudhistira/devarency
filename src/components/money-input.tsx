import type React from "react";
import Nationbutton from "./nation-button";
import { Input } from "./ui/input";
import { Item } from "./ui/item";
import { NumericFormat } from "react-number-format";
type props={
  inputname:string;
  onchange:React.ChangeEventHandler<HTMLInputElement>;
}
export default function Moneyinput({ inputname,onchange }:props) {
  return (
    <Item className="bg-gray-950 text-white">
      <h1 className="text-xl font-lg flex items-center gap-2 font-medium">
        {" "}
        {inputname}{" "}
      </h1>
      <div className="flex items-center gap-3 w-full justify-between">
        <NumericFormat
          customInput={Input}
          placeholder="insert nominee here"
          className="border border-primary ring-0 placeholder:text-sm  outline-0 text-2xl font-black"          
          type="tel"
          name="harga"
          id="price"
          onChange={onchange}      
        />
        <Nationbutton nation="IDR" />
      </div>
    </Item>
  );
}
