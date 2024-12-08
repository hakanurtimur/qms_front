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
    console.log("res", res);
    if (resWithTyped.isSuccessful) {
      router.push("/login");
    }

    console.log(data);
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
