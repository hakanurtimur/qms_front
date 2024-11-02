import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  EmployeeToManageTableModel,
  SEmployeeToManageTableModel,
} from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { useForm } from "react-hook-form";
import { EmployeeRole } from "@/models/admin/employeeManagement/roles";
import Combobox from "@/components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
  roles: EmployeeRole[];
}

const EmployeeForm = ({ model, onSubmit, roles }: Props) => {
  const form = useForm<EmployeeToManageTableModel>({
    resolver: zodResolver(SEmployeeToManageTableModel),
    defaultValues: {
      ...model,
      phoneNumber: model.phoneNumber ?? "",
      mail: model.mail ?? "",
    },
  });
  function convertRolesToOptions(roles: EmployeeRole[]): {
    [key: string]: string;
  } {
    return roles.reduce(
      (options, role) => {
        options[role.roleId] = role.roleName;
        return options;
      },
      {} as { [key: number]: string },
    );
  }

  const roleOptions = convertRolesToOptions(roles);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="nameSurname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad-Soyad</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
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
          name="departmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bölüm</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
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
          name="jobName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Görev</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
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
          name="titleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ünvan</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className={"bg-primary-100"}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox<EmployeeToManageTableModel>
          control={form.control}
          name={"roleId"}
          label={"Rol"}
          options={roleOptions}
        />
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GSM</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className={"bg-primary-100"}
                  readOnly
                />
              </FormControl>
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
  );
};

export default EmployeeForm;
