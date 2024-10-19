"use client";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { useEffect } from "react";
import tokenService from "@/services/TokenService";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = !tokenService.isAccessTokenExpired();
    if (authToken) {
      router.push("/user");
    }
  }, [router]);

  return <LoadingScreen />;
};

export default Page;
