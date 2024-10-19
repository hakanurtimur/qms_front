"use client";
import { useForm } from "react-hook-form";
import { ManagerLogin, SManagerLogin } from "@/models/auth";
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
import { EyeIcon, EyeSlashIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Location } from "@/models/location";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import FormContainerCard from "@/components/ui/formContainerCard";

interface Props {
  locations: Location[];
  locationLoading: boolean;
  onSubmit: (data: ManagerLogin) => void;
  error: string | null;
  formLoading: boolean;
}

const AdminLogin = ({
  locations,
  locationLoading,
  onSubmit,
  error,
  formLoading,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<ManagerLogin>({
    resolver: zodResolver(SManagerLogin),
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
      <div className="flex flex-col gap-4 items-center bg-gradient-to-b from-slate-800 to-slate-900 relative">
        <div className="absolute bottom-5 right-5">
          <Button variant="primary" size={"icon"} asChild>
            <Link href={"/login"}>
              <UsersIcon className="h-8 w-8" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 animate-slide-in-from-right relative">
        <div className="absolute right-5 top-5">
          <Logo />
        </div>
        <FormContainerCard title={"Yönetici Girişi"} className="w-1/2">
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
    </div>
  );
};

export default AdminLogin;
