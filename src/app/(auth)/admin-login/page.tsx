"use client";
import AdminLogin from "@/components/auth/AdminLogin";
import { useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";

const Page = () => {
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  return (
    <div>
      <AdminLogin
        locations={query.data ?? []}
        locationLoading={query.isPending}
      />
    </div>
  );
};

export default Page;
