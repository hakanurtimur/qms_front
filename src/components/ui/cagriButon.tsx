import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CagriButon = () => {
  return (
    <Button
      className={"hover:bg-transparent"}
      size={"sm"}
      asChild
      variant="ghost"
    >
      <Link href="https://www.google.com">
        <Image width={50} height={50} src={"/icons/cagri-ikon.png"} alt={""} />
      </Link>
    </Button>
  );
};

export default CagriButon;
