import { Cpu } from "lucide-react";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div
      className={
        "font-bold flex justify-center items-center text-3xl text-primary-900 cursor-pointer " +
        className
      }
      onClick={() => {
        if (window.location.pathname.includes("user")) {
          window.location.href = "/user";
        } else if (window.location.pathname.includes("admin")) {
          window.location.href = "/admin";
        }
      }}
    >
      <Cpu className="h-8 w-8 mr-2" />
      Qubqa
    </div>
  );
};

export default Logo;
