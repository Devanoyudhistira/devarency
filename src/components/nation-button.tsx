import { Button } from "./ui/button";

type Props = {
  nation:string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Nationbutton({nation,onClick}:Props) {
  return (
    <Button
      size="lg"
      value={`default`}
      className={`bg-primary text-lg text-white border-2 shadow-[4px_4px_0_black]`}
      onClick={onClick}
    >
      {nation}
    </Button>
  );
}
