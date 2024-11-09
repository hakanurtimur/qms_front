import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  ModuleToManageModel,
  SModuleToManageModel,
} from "@/models/admin/moduleManagement/moduleManagement";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Props {
  onSubmit: (data: ModuleToManageModel) => void;
  model?: ModuleToManageModel;
}
const ModuleForm = ({ onSubmit, model }: Props) => {
  const form = useForm<ModuleToManageModel>({
    resolver: zodResolver(SModuleToManageModel),
    defaultValues: {
      moduleName: model ? (model.moduleName ?? "") : "",
      state: model ? (model.state ?? false) : false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <FormField
          control={form.control}
          name="moduleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"flex items-center justify-between"}>
                Modül Adı
              </FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  className={"bg-primary-100"}
                  readOnly
                />
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

          <Button type="submit">Kaydet</Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default ModuleForm;
