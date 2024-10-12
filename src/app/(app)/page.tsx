"use client";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import Logo from "@/components/ui/Logo";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col gap-12 items-center justify-center">
      <Logo />
      <LoadingSpinner className={"w-48 h-48"} />
    </div>
  );
};

export default Page;
