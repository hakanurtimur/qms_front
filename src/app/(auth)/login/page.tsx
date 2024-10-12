"use client";

import Login from "@/components/auth/Login";
import { useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";

const Page = () => {
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  return (
    <div>
      <Login locations={query.data ?? []} locationLoading={query.isPending} />
    </div>
  );
};

export default Page;
