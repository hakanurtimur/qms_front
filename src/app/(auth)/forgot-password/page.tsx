"use client";
import { ForgotPasswordModel } from "@/models/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tokenService from "@/services/TokenService";
import LoadingScreen from "@/components/commons/LoadingScreen";
import ForgotPassowordForm from "@/components/ui/reusable-forms/forgot-passoword-form";
import FormPage from "@/app/(auth)/forgot-password/_components/form-page";
import { IAlertState, useAlertStore } from "@/services/states/alert.service";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const { showAlertForDuration } = useAlertStore(
    (state) => state as IAlertState,
  );

  useEffect(() => {
    const authToken = !tokenService.isAccessTokenExpired();
    if (authToken) {
      router.push("/user");
    }
    setLoading(false);
  }, [router]);

  const handleSubmit = (data: ForgotPasswordModel) => {
    if (!captchaValue) {
      showAlertForDuration(
        "Lütfen reCAPTCHA doğrulamasını yapınız",
        "error",
        3000,
      );
      return;
    }
    console.log(data);
  };

  const setCaptchaValueHandler = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FormPage>
          <ForgotPassowordForm
            setCaptchaValue={setCaptchaValueHandler}
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
