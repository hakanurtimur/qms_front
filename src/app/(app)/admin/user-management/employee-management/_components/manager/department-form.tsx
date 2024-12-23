import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  EmployeeToManageTableModel,
  SEmployeeToManageTableModel,
} from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { useForm } from "react-hook-form";
import Combobox from "@/components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAdminGetDepartments } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetDepartments";
import { convertObjectArrayToOptions } from "@/utils/convertObjectArrayToOptions";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
}

const DepartmentForm = ({ model, onSubmit }: Props) => {
  const departmentQuery = useAdminGetDepartments();
  const form = useForm<EmployeeToManageTableModel>({
    resolver: zodResolver(SEmployeeToManageTableModel),
    defaultValues: {
      ...model,
      departmentId: 0,
      phoneNumber: model.phoneNumber ?? "",
      mail: model.mail ?? "",
    },
  });

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
          variant={"in-column"}
          searchStringCase={"upper"}
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

export default DepartmentForm;
