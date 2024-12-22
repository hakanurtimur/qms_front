import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CagriButon = () => {
  const URL = process.env.NEXT_PUBLIC_CHAT_APP_URL || "http://10.35.45.5:8585";
  return (
    <Button
      className={"hover:bg-transparent animate-bounce min-w-fit"}
      size={"sm"}
      asChild
      variant="ghost"
    >
      <Link href={URL} target="_blank">
        <Image width={75} height={75} src={"/icons/cagri-ikon.png"} alt={""} />
      </Link>
    </Button>
  );
};

export default CagriButon;
