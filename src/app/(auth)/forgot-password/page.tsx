"use client";
import { ForgotPasswordModel } from "@/models/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tokenService from "@/services/TokenService";
import ForgotPassowordForm from "@/components/ui/reusable-forms/forgot-passoword-form";
import FormPage from "@/app/(auth)/forgot-password/_components/form-page";
import {
  IForgetPasswordState,
  useForgetPasswordStore,
} from "./store/forget-password.store";
import { ResponseModel } from "@/models/api/response";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { forgetPassword } = useForgetPasswordStore(
    (state) => state as IForgetPasswordState,
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
      return;
    }
    const res: unknown = await forgetPassword(data.email);
    const resWithTyped = res as ResponseModel;
    if (resWithTyped.isSuccessful) {
      router.push("/login");
      toast({
        title: "Başarılı",
        description:
          "Şifre sıfırlama talimatları e-posta adresinize gönderildi.",
        variant: "success",
      });
    } else {
      toast({
        title: "Hata",
        description: `Eksik veya hatalı giriş yaptınız. Lütfen tekrar deneyin.`,
        variant: "destructive",
      });
    }
  };

  const setCaptchaValueHandler = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <div>
      {loading ? null : (
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
