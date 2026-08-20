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
import { SquareOff } from "lucide-react";
import newcountry from "@/model/allcountry";

type props = {
  opencondition: boolean;
  onchange: (open: boolean) => void;
  changenation: (nation: string) => void;
  changefullnation: (nation: string) => void;
};

export default function Nationdialog({
  opencondition,
  onchange,
  changenation,
  changefullnation,
}: props) {
  const countries = useCountryStore((state) => state.countries);
  const getCountries = useCountryStore((state) => state.getCountries);

  const allcountry = [...countries, ...newcountry];

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <Dialog open={opencondition} onOpenChange={onchange}>
      <DialogContent
        className={`text-primary bg-background font-semibold text-lg `}
      >
        <DialogHeader>
          <DialogTitle className={`text-2xl`}>choose the nation</DialogTitle>
          <DialogDescription className={`text-lg -mt-2`}>
            with 25 different nation
          </DialogDescription>
        </DialogHeader>
        {
          <div className=" no-scrollbar flex flex-col gap-2 max-h-[50vh] overflow-y-auto px-4">
            {allcountry
              .sort((a, b) => a.names.common.localeCompare(b.names.common))
              .map(
                (e) =>
                  e.currencies[0]?.code && (
                    <Button
                      onClick={() => {
                        changenation(e.currencies[0].code);
                        changefullnation(e.names.common);
                        onchange(false);
                      }}
                      type="button"
                      size="lg"
                      variant="default"
                      className={`py-5 h-15 bg-green-400 text-left px-3 flex justify-between`}
                    >
                      <div className="flex items-center gap-1.5">
                        {e.flag?.url_svg ? (
                          <img
                            src={e.flag?.url_png}
                            className="w-10 h-10 rounded-full border"
                            alt=""
                          />
                        ) : (
                          <SquareOff className="size-8" />
                        )}
                        <div className="flex flex-col justify-center text-black text-left">
                          <h2 className="  p-0 items-center text-2xl  font-semibold">
                            {e.names?.common}
                          </h2>
                          <span className="text-md -mt-2 ">
                            {" "}
                            {e.currencies[0]?.name}{" "}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm bg-white text-black border-black p-1 border-2">
                        {" "}
                        {e.currencies[0]?.code}{" "}
                      </h3>
                    </Button>
                  ),
              )}
          </div>
        }
      </DialogContent>
    </Dialog>
  );
}
