"use client";
import { ForgotPasswordModel } from "@/models/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tokenService from "@/services/TokenService";
import LoadingScreen from "@/components/commons/LoadingScreen";
import ForgotPassowordForm from "@/components/ui/reusable-forms/forgot-passoword-form";
import FormPage from "@/app/(auth)/forgot-password/_components/form-page";

const Page = () => {
  const router = useRouter();
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = !tokenService.isAccessTokenExpired();
    if (authToken) {
      router.push("/user");
    }
    setLoading(false);
  }, [router]);

  //TODO: Add forgot password mutation

  // const mutation = useMutation({
  //   mutationFn: (manager: ManagerLogin) => authService.managerLogin(manager),
  //   onSuccess: (data) => {
  //     toast({
  //       variant: "success",
  //       description: "Başarıyla giriş yapıldı",
  //     });
  //     onSetAuthenticated(true);
  //     onSetUser(data);
  //     router.push("/admin");
  //   },
  //   onError: (error) => {
  //     toast({
  //       variant: "destructive",
  //       description: error.message,
  //     });
  //     setError(error.message);
  //   },
  // });

  const handleSubmit = (data: ForgotPasswordModel) => {
    console.log(data);
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FormPage>
          <ForgotPassowordForm
            onSubmit={handleSubmit}
            error={null}
            formLoading={false}
          />
        </FormPage>
      )}
    </div>
  );
};

export default Page;
