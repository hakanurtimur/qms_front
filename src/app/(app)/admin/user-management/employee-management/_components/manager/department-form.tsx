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
import { EmployeeDepartment } from "@/models/admin/employeeManagement/departments";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
  departments: EmployeeDepartment[];
}

const DepartmentForm = ({ model, onSubmit, departments }: Props) => {
  const form = useForm<EmployeeToManageTableModel>({
    resolver: zodResolver(SEmployeeToManageTableModel),
    defaultValues: {
      ...model,
      departmentId: 0,
      phoneNumber: model.phoneNumber ?? "",
      mail: model.mail ?? "",
    },
  });

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
