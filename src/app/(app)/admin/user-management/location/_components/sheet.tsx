import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { ManagerLocationModel } from "@/models/admin/location";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Props {
  model: ManagerLocationModel;
  onSubmit: (data: ManagerLocationModel) => void;
}

const FormSheet = ({ model, onSubmit }: Props) => {
  const form = useForm<ManagerLocationModel>({
    defaultValues: {
      locationId: 1,
      locationName: model.locationName,
      countryName: model.countryName,
      cityName: model.cityName,
      state: model.state,
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lokasyon Düzenle</SheetTitle>
          <SheetDescription>
            Buradan lokasyon bilgilerini düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-5 flex-col my-5 mt-20">
          <div className="flex flex-col space-y-2">
            <Label>Ülke</Label>
            <Input
              readOnly
              value={form.getValues("countryName") as string}
              className="bg-primary-100"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Şehir</Label>
            <Input
              readOnly
              value={form.getValues("cityName") as string}
              className="bg-primary-100"
            />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="locationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şube Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="items-center gap-2 flex space-y-0">
                  <FormLabel className="flex items-center">Pasif</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="flex items-center">Aktif</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  İptal Et
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button type="submit">Kaydet</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;
