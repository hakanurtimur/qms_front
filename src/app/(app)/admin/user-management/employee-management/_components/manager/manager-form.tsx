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
import { EmployeeDepartment } from "@/models/admin/employeeManagement/departments";
import { Switch } from "@/components/ui/switch";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
  roles: EmployeeRole[];
  departments: EmployeeDepartment[];
}

const ManagerForm = ({ model, onSubmit, roles, departments }: Props) => {
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
  function convertDepartmentsToOptions(departments: EmployeeDepartment[]): {
    [key: string]: string;
  } {
    const uniqueNames = new Set<string>();

    return departments.reduce(
      (options, department) => {
        if (!uniqueNames.has(department.departmentName)) {
          uniqueNames.add(department.departmentName);
          options[department.departmentId] = department.departmentName;
        }
        return options;
      },
      {} as { [key: string]: string },
    );
  }

  const roleOptions = convertRolesToOptions(roles);
  const departmentOptions = convertDepartmentsToOptions(departments);

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
        <Combobox<EmployeeToManageTableModel>
          control={form.control}
          name={"departmentId"}
          label={"Bölüm"}
          options={departmentOptions}
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

        <FormItem>
          <FormLabel>Ünvan</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              value={model.titleName ?? ""}
              className={"bg-primary-100"}
              readOnly
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Combobox<EmployeeToManageTableModel>
          control={form.control}
          name={"roleId"}
          label={"Rol"}
          options={roleOptions}
        />

        <FormItem>
          <FormLabel>Mail</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              value={model.mail ?? ""}
              className={"bg-primary-100"}
              readOnly
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>GSM</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              value={model.phoneNumber ?? ""}
              className={"bg-primary-100"}
              readOnly
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="workingStatus"
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
  );
};

export default ManagerForm;
