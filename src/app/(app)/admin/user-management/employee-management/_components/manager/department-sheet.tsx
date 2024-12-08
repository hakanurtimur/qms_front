"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import React from "react";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";
import { EmployeeDepartment } from "@/models/admin/employeeManagement/departments";
import DepartmentForm from "@/app/(app)/admin/user-management/employee-management/_components/manager/department-form";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
  departments: EmployeeDepartment[];
}

const DepartmentSheet = ({ model, onSubmit, departments }: Props) => {
  const query = useQuery({
    queryKey: ["manager-management", model.id],
    queryFn: () => employeeManagementService.getManager(model.id.toString()),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <BriefcaseIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Yönetici Departman Atama</SheetTitle>
          <SheetDescription>
            Buradan yönetici departman atamalarını düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        {query.data ? (
          <DepartmentForm
            model={query.data.data}
            onSubmit={onSubmit}
            departments={departments}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default DepartmentSheet;
