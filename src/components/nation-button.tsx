import { Button } from "./ui/button";

export default function Nationbutton({nation}:{nation:string}) {
  return (
    <Button
      size="lg"
      value={`default`}
      className={`bg-primary text-lg text-white border-2 shadow-[4px_4px_0_black]`}
    >
      {nation}
    </Button>
  );
}
