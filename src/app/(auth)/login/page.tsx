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
import tokenService from "@/services/TokenService";
import LoadingScreen from "@/components/commons/LoadingScreen";

const Page = () => {
  const { onSetAuthenticated, onSetUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const query = useQuery({
    queryKey: ["locations"],
    queryFn: () => listService.getLocations(),
  });

  const moduleQuery = useQuery({
    queryKey: ["modules"],
    queryFn: () => listService.getModules(),
  });

  useEffect(() => {
    const authToken = !tokenService.isAccessTokenExpired();
    if (authToken) {
      router.push("/user");
    }
    setLoading(false);
  }, [router]);

  const mutation = useMutation({
    mutationFn: (data: UserLogin) => authService.userLogin(data),
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Başarıyla giriş yapıldı",
      });
      onSetAuthenticated(true);
      onSetUser(data);
      router.push("/user");
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
      {loading ? (
        <LoadingScreen />
      ) : (
        <Login
          locations={query.data?.data ?? []}
          locationLoading={query.isPending}
          modules={moduleQuery.data?.data ?? []}
          moduleLoading={moduleQuery.isPending}
          onSubmit={handleSubmit}
          error={error}
          formLoading={mutation.isPending}
        />
      )}
    </div>
  );
};

export default Page;
