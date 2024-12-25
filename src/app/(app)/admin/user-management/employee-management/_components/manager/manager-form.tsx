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
import Combobox from "@/components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { useAdminGetRoles } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetRoles";
import { useAdminGetDepartments } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetDepartments";
import { convertObjectArrayToOptions } from "@/utils/convertObjectArrayToOptions";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
}

const ManagerForm = ({ model, onSubmit }: Props) => {
  const roleQuery = useAdminGetRoles();
  const departmentQuery = useAdminGetDepartments();
  const form = useForm<EmployeeToManageTableModel>({
    resolver: zodResolver(SEmployeeToManageTableModel),
    defaultValues: {
      ...model,
      phoneNumber: model?.phoneNumber ?? "",
      mail: model?.mail ?? "",
    },
  });

  const roleOptions = convertObjectArrayToOptions(
    roleQuery.data?.data ?? [],
    "roleId",
    "roleName",
  );
  const departmentOptions = convertObjectArrayToOptions(
    departmentQuery.data?.data ?? [],
    "departmentId",
    "departmentName",
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="nameSurname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adı Soyadı</FormLabel>
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
          variant={"in-column"}
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
              value={model?.titleName ?? ""}
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
          variant={"in-column"}
        />

        <FormItem>
          <FormLabel>Mail</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              value={model?.mail ?? ""}
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
              value={model?.phoneNumber ?? ""}
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
