import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useCountryStore } from "@/model/countrystore";

type props = {
  opencondition: boolean;
  onchange: React.ComponentProps<typeof Dialog>["onOpenChange"];
  changenation: (nation: string) => void;
  changefullnation: (nation: string) => void;
};

export default function Nationdialog({
  opencondition,
  onchange,
  changenation,
  changefullnation
}: props) {
  const countries = useCountryStore((state) => state.countries);
  const getCountries = useCountryStore((state) => state.getCountries);
  const newcountry = [
    { names: { common: "Indonesia" }, currencies: [{ code: "IDR" }] },
    { names: { common: "Malaysia" }, currencies: [{ code: "MYR" }] },
    { names: { common: "America" }, currencies: [{ code: "USD" }] },
  ];
  const allcountry = [...countries, ...newcountry];

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <Dialog open={opencondition} onOpenChange={onchange}>
      <DialogContent className={`text-primary font-semibold text-lg `}>
        <DialogHeader>
          <DialogTitle>choose the nation</DialogTitle>
          <DialogDescription>with 25 different nation</DialogDescription>
        </DialogHeader>
        {
          <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            {allcountry.map((e) => (
              <Button
                onClick={() => {
                  changenation(e.currencies[0].code);
                  changefullnation(e.names.common)
                }}
                type="button"
                size="lg"
                variant="default"
              >
                {e.names.common}
              </Button>
            ))}
          </div>
        }
      </DialogContent>
    </Dialog>
  );
}
