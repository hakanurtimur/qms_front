"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

interface Props {
  title: string;
  children: React.ReactNode;
}

const NonLoginLayout = ({ title, children }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <div
        className={`transition-[padding] ease duration-500 flex flex-col sm:gap-4 sm:pb-4 sm:pl-0`}
      >
        <header className="sticky py-4 bg-primary-900 top-0 z-0 flex h-14 items-center justify-between border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
          <Button
            size={"icon"}
            variant={"outline"}
            className={"flex"}
            onClick={router.back}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <div className="text-2xl font-semibold text-white">{title}</div>
          <div></div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
      </div>
    </div>
  );
};

export default NonLoginLayout;
