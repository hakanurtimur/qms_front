"use client";
import AdminLogin from "@/components/auth/AdminLogin";
import { useMutation, useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";
import { ManagerLogin } from "@/models/auth";
import authService from "@/services/AuthService";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { onSetAuthenticated, onSetUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  const mutation = useMutation({
    mutationFn: (manager: ManagerLogin) => authService.managerLogin(manager),
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Başarıyla giriş yapıldı",
      });
      router.push("/admin");
      onSetAuthenticated(true);
      onSetUser(data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
      setError(error.message);
    },
  });

  const handleSubmit = (data: ManagerLogin) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <AdminLogin
        locations={query.data?.data ?? []}
        locationLoading={query.isPending}
        onSubmit={handleSubmit}
        error={error}
        formLoading={mutation.isPending}
      />
    </div>
  );
};

export default Page;
