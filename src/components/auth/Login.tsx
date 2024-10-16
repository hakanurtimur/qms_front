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
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Location } from "@/models/location";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Module } from "@/models/module";

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

  useEffect(() => {
    if (!locationLoading && locations.length > 0) {
      form.setValue("locationId", locations[0].locationId);
    }
  }, [form, locationLoading, locations]);

  return (
    <div className="grid grid-cols-2 w-full h-screen bg-slate-50">
      <div className="flex flex-col items-center justify-center gap-8 animate-slide-in-from-left relative">
        <div className="absolute top-5 left-5">
          <Logo />
        </div>
        <Card className="w-1/2 border-slate-900 border-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Personel Girişi</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                      <FormControl>
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4 items-center bg-gradient-to-b from-slate-700 to-slate-900 relative">
        <div className="bottom-5 left-5 absolute">
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
              >
                {module.moduleName}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
