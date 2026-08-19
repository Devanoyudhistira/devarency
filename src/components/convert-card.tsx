

import { ArrowDownUp, DollarSign } from "lucide-react";
import Moneyinput from "./money-input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Moneyresult from "./money-result";

export default function Convertcard(){
    return (
        <Card className="bg-slate-800 shadow-[8px_8px_0_black] w-[80%] flex flex-col items-center " >
            <h1 className="text-primary text-3xl font-black flex items-center gap-2 " >  <DollarSign className="size-8" /> Convert Money </h1>
            <CardContent className="flex flex-col gap-4 items-center" >
                <Moneyinput inputname="base currency" />
                <Button variant="default" size="icon-lg" className={`rounded-full p-4 `} >
                    <ArrowDownUp color="white" className="size-6" />
                </Button>
                <Moneyresult/>
            </CardContent>
            <CardFooter className="text-md text-gray-500 font-semibold" > 1 USD = 17.800 IDR </CardFooter>
        </Card>
    )
}