"use client";
import { ForgotPasswordModel } from "@/models/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tokenService from "@/services/TokenService";
import LoadingScreen from "@/components/commons/LoadingScreen";
import ForgotPassowordForm from "@/components/ui/reusable-forms/forgot-passoword-form";
import FormPage from "@/app/(auth)/forgot-password/_components/form-page";
import { IAlertState, useAlertStore } from "@/services/states/alert.service";
import {
  IForgetPasswordState,
  useForgetPasswordStore,
} from "./store/forget-password.store";
import { ResponseModel } from "@/models/api/response";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { forgetPassword } = useForgetPasswordStore(
    (state) => state as IForgetPasswordState,
  );
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

  const handleSubmit = async (data: ForgotPasswordModel) => {
    if (!captchaValue) {
      showAlertForDuration(
        "Lütfen reCAPTCHA doğrulamasını yapınız",
        "error",
        3000,
      );
      return;
    }
    const res: unknown = await forgetPassword(data.email);
    const resWithTyped = res as ResponseModel;
    console.log("res", res);
    if (resWithTyped.isSuccessful) {
      showAlertForDuration("Şifre sıfırlama maili gönderildi", "success", 3000);
      console.log("success");

      router.push("/login");
    } else {
      console.log("error");
      showAlertForDuration("Bir hata oluştu", "error", 3000);
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
