"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  return <div>HOME PAGE</div>;
};

export default Page;
