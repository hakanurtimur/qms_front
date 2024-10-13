"use client";

import Login from "@/components/auth/Login";
import { useMutation, useQuery } from "@tanstack/react-query";
import listService from "@/services/ListService";
import { UserLogin } from "@/models/auth";
import { useRouter } from "next/navigation";
import authService from "@/services/AuthService";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

const Page = () => {
  const { onSetAuthenticated, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  const moduleQuery = useQuery({
    queryKey: ["modules"],
    queryFn: () => listService.getModules(),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/user");
    }
  }, [isAuthenticated, router]);

  const mutation = useMutation({
    mutationFn: (data: UserLogin) => authService.userLogin(data),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Başarıyla giriş yapıldı",
      });
      router.push("/user");
      onSetAuthenticated(true);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
      setError(error.message);
    },
  });

  const handleSubmit = async (data: UserLogin) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div>
      <Login
        locations={query.data?.data ?? []}
        locationLoading={query.isPending}
        modules={moduleQuery.data?.data ?? []}
        moduleLoading={moduleQuery.isPending}
        onSubmit={handleSubmit}
        error={error}
        formLoading={mutation.isPending}
      />
    </div>
  );
};

export default Page;
