"use client";
import { useForm } from "react-hook-form";
import { SUserLogin, UserLogin } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Location } from "@/models/location";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Module } from "@/models/module";
import { routeNameGenerator } from "@/utils/routeNameGenerator";
import FormContainerCard from "@/components/ui/formContainerCard";
import CagriButon from "@/components/ui/cagriButon";

interface Props {
  locations: Location[];
  locationLoading: boolean;
  modules: Module[];
  moduleLoading: boolean;
  onSubmit: (data: UserLogin) => void;
  error: string | null;
  formLoading: boolean;
}

const Login = ({
  locations,
  locationLoading,
  modules,
  moduleLoading,
  onSubmit,
  error,
  formLoading,
}: Props) => {
  const form = useForm<UserLogin>({
    resolver: zodResolver(SUserLogin),
    defaultValues: {
      locationId: locations.length > 0 ? locations[0].locationId : 0,
      username: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!locationLoading && locations.length > 0) {
      form.setValue("locationId", locations[0].locationId);
    }
  }, [form, locationLoading, locations]);

  return (
    <div className="grid grid-cols-2 w-full h-screen bg-primary-50">
      <div className="md:col-span-1 md:pb-0 py-5 md:px-0 px-5  col-span-2 flex flex-col items-center justify-center gap-8 animate-slide-in-from-left relative">
        <div className="md:absolute top-5 left-5 mt-5 md:mt-0">
          <Logo />
        </div>
        <div className="md:absolute bottom-5 left-5">
          <CagriButon />
        </div>
        <div className="md:hidden block">
          <Button
            disabled={locationLoading}
            variant="primary"
            size={"icon"}
            asChild
          >
            <Link href={"/admin-login"}>
              <BriefcaseIcon className="h-8 w-8" />
            </Link>
          </Button>
        </div>
        <FormContainerCard
          title={"Personel Girişi"}
          className="md:w-1/2 w-full"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <div>Şube</div>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value.toString()}
                        disabled={true}
                      >
                        <SelectTrigger>
                          {locationLoading ? (
                            <div className="w-full flex items-center justify-center">
                              <LoadingSpinner />
                            </div>
                          ) : (
                            <SelectValue />
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          {locations.length > 0 &&
                            locations.map((location) => (
                              <SelectItem
                                value={location.locationId.toString()}
                                key={location.locationId}
                              >
                                {location.locationName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
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
              <div className="flex items-en justify-end">
                <p className="text-primary-900 text-sm">Şifremi Unuttum</p>
              </div>
              <p className="text-danger-500">{error && error}</p>
              <Button
                disabled={locationLoading || formLoading}
                variant="primary"
                type="submit"
              >
                {formLoading || locationLoading ? (
                  <div className="w-full flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <p>Giriş Yap</p>
                )}
              </Button>
            </form>
          </Form>
        </FormContainerCard>
      </div>
      <div className="md:col-span-1 md:pb-0 md:px-0 px-5 py-5 col-span-2  flex flex-col gap-4 items-center bg-gradient-to-b from-slate-700 to-slate-900 relative">
        <div className="bottom-5 left-5 hidden md:block absolute">
          <Button
            disabled={locationLoading}
            variant="primary"
            size={"icon"}
            asChild
          >
            <Link href={"/admin-login"}>
              <BriefcaseIcon className="h-8 w-8" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col justify-center gap-12 items-stretch flex-1">
          {moduleLoading ? (
            <LoadingSpinner className={"w-32 h-32"} />
          ) : (
            modules.map((module) => (
              <Button
                key={module.moduleId}
                variant="outline"
                size="4xl"
                className=""
                asChild
              >
                <Link href={`modules/${routeNameGenerator(module.moduleName)}`}>
                  {module.moduleName}
                </Link>
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
