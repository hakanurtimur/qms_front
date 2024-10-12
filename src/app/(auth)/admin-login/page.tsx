"use client";
import AdminLogin from "@/components/auth/AdminLogin";
import { useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";
import { AdminLoginForm } from "@/models/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  const handleSubmit = (data: AdminLoginForm) => {
    if (data.username === "testadmin" && data.password === "12345678") {
      router.push("/admin");
    }
  };

  return (
    <div>
      <AdminLogin
        locations={query.data?.data ?? []}
        locationLoading={query.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Page;
