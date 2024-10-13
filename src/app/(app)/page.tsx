"use client";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";

const Page = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/user";
    } else {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  return <LoadingScreen />;
};

export default Page;
