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
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import { useQuery } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";
import { EmployeeRole } from "@/models/admin/employeeManagement/roles";
import ManagerForm from "@/app/(app)/admin/user-management/employee-management/_components/manager/manager-form";
import { EmployeeDepartment } from "@/models/admin/employeeManagement/departments";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
  roles: EmployeeRole[];
  departments: EmployeeDepartment[];
}

const ManagerSheet = ({ model, onSubmit, roles, departments }: Props) => {
  const query = useQuery({
    queryKey: ["manager-management", model.id],
    queryFn: () => employeeManagementService.getManager(model.id.toString()),
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
          <SheetTitle>Yönetici Bilgisi</SheetTitle>
          <SheetDescription>
            Buradan yönetici bilgilerini düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        {query.data ? (
          <ManagerForm
            model={query.data.data}
            onSubmit={onSubmit}
            roles={roles}
            departments={departments}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default ManagerSheet;
