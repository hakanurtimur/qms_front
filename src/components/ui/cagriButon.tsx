import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CagriButon = () => {
  return (
    <Button
      className={"hover:bg-transparent animate-bounce min-w-fit"}
      size={"sm"}
      asChild
      variant="ghost"
    >
      <Link href="http://10.35.45.5:8585" target="_blank">
        <Image width={75} height={75} src={"/icons/cagri-ikon.png"} alt={""} />
      </Link>
    </Button>
  );
};

export default CagriButon;
