"use client";

import { ChangePasswordModel, SChangePasswordModel } from "@/models/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormContainerCard from "@/components/ui/form-container-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/context/authContext";

interface Props {
  onSubmit: (data: ChangePasswordModel) => void;
  error: string | null;
  formLoading: boolean;
  variant?: "screen" | "sheet";
}

const ChangePassowordForm = ({
  onSubmit,
  formLoading,
  error,
  variant = "screen",
}: Props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const router = useRouter();
  const {user} = useAuth();
  const form = useForm<ChangePasswordModel>({
    resolver: zodResolver(SChangePasswordModel),
    defaultValues: {
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <FormContainerCard
      title={variant === "screen" ? "Şifremi Unuttum" : undefined}
      className={`${variant === "screen" ? "md:w-1/2 w-full" : "w-full p-0 mt-5 pt-10 mb-0 border-2"}`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eski Şifre</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  {!showOldPassword ? (
                    <EyeIcon
                      className="h-5 w-5 absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowOldPassword(true)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 w-5 absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowOldPassword(false)}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Şifre</div>
                </FormLabel>
                <div className="relative">
                  <FormControl className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  {!showPassword ? (
                    <EyeIcon
                      className="h-5 w-5 absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 w-5 absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div>Şifre Tekrar</div>
                </FormLabel>
                <div className="relative">
                  <FormControl className="relative">
                    <Input
                      type={showPasswordConfirm ? "text" : "password"}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  {!showPasswordConfirm ? (
                    <EyeIcon
                      className="h-5 w-5 absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowPasswordConfirm(true)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 w-5 absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowPasswordConfirm(false)}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            {variant === "screen" && (
              <>
                <Button
                  disabled={formLoading}
                  variant="outline"
                  type="button"
                  onClick={() => {
                    router.back();
                  }}
                >
                  {formLoading ? (
                    <div className="w-full flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <p>Geri</p>
                  )}
                </Button>
                <Button disabled={formLoading} variant="primary" type="submit">
                  {formLoading ? (
                    <div className="w-full flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <p>Sıfırla</p>
                  )}
                </Button>
              </>
            )}
            {variant === "sheet" && (
              <>
                <SheetClose>
                  <Button type="button" variant={"outline"}>
                    İptal Et
                  </Button>
                </SheetClose>
                <Button disabled={formLoading} variant="primary" type="submit">
                  {formLoading ? (
                    <div className="w-full flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <p>Sıfırla</p>
                  )}
                </Button>{" "}
              </>
            )}
          </div>
          <p className="text-danger-500">{error && error}</p>
        </form>
      </Form>
    </FormContainerCard>
  );
};

export default ChangePassowordForm;
