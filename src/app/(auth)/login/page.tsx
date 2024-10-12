"use client";

import Login from "@/components/auth/Login";
import { useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";
import { LoginForm } from "@/models/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  const moduleQuery = useQuery({
    queryKey: ["modules"],
    queryFn: () => listService.getModules(),
  });

  const handleSubmit = (data: LoginForm) => {
    if (data.username === "testuser" && data.password === "12345678") {
      router.push("/user");
    }
  };

  return (
    <div>
      <Login
        locations={query.data?.data ?? []}
        locationLoading={query.isPending}
        modules={moduleQuery.data?.data ?? []}
        moduleLoading={moduleQuery.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Page;
