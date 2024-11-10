import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  text: string;
  onClick: () => void;
}
const SortingBtn = ({ text, onClick }: Props) => {
  return (
    <Button
      variant="ghost"
      className="bg-transparent hover:bg-transparent p-0"
      onClick={onClick}
    >
      {text}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default SortingBtn;
