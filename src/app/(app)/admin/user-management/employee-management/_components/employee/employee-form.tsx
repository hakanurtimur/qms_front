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
import { useAdminGetRoles } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetRoles";
import { convertObjectArrayToOptions } from "@/utils/convertObjectArrayToOptions";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
}

const EmployeeForm = ({ model, onSubmit }: Props) => {
  const roleQuery = useAdminGetRoles();

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
        <FormItem>
          <FormLabel>Bölüm</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              value={model?.departmentName ?? ""}
              className={"bg-primary-100"}
              readOnly
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Görev</FormLabel>
          <FormControl>
            <Input
              placeholder=""
              value={model?.jobName ?? ""}
              className={"bg-primary-100"}
              readOnly
            />
          </FormControl>
          <FormMessage />
        </FormItem>
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
          searchStringCase={"upper"}
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
