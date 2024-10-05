"use client";
import { useForm } from "react-hook-form";
import { LoginForm, SLoginForm } from "@/models/auth";
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

const Login = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(SLoginForm),
    defaultValues: { username: "", password: "", branch: "" },
  });
  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };
  return (
    <div className="grid grid-cols-2 w-full h-screen bg-slate-50">
      <div className="flex flex-col items-center justify-center gap-8 animate-slide-in-from-left">
        <div className="flex items-start w-1/2">
          <Logo />
        </div>
        <div className="w-1/2 font-semibold text-xl text-primary-600">
          Kullanıcı girişi
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-1/2"
          >
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Şube</div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Şube Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"1"}>Şube 1</SelectItem>
                        <SelectItem value={"2"}>Şube 2</SelectItem>
                        <SelectItem value={"3"}>Şube 3</SelectItem>
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
            <Button variant="primary" type="submit">
              Giriş Yap
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-4 items-center bg-gradient-to-b from-slate-700 to-slate-900">
        <div className=" w-full text-end p-5">
          <Button variant="primary" size={"icon"} asChild>
            <Link href={"/admin-login"}>
              <BriefcaseIcon className="h-8 w-8" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col justify-center gap-8 items-center flex-1">
          <Button variant="primary" size="lg">
            Döküman Yönetimi
          </Button>
          <Button variant="primary" size="lg">
            Döküman Yönetimi
          </Button>
          <Button variant="primary" size="lg">
            Döküman Yönetimi
          </Button>
          <Button variant="primary" size="lg">
            Döküman Yönetimi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
