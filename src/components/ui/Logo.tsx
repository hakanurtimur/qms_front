import { Cpu } from "lucide-react";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div
      className={
        "font-bold flex justify-center items-center text-3xl text-primary-900 " +
        className
      }
    >
      <Cpu className="h-8 w-8 mr-2" />
      Qubqa
    </div>
  );
};

export default Logo;
