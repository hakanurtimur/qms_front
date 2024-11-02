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
import EmployeeForm from "@/app/(app)/admin/user-management/employee-management/_components/employee/employee-form";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { EmployeeRole } from "@/models/admin/employeeManagement/roles";

interface Props {
  model: EmployeeToManageTableModel;
  onSubmit: (data: EmployeeToManageTableModel) => void;
  roles: EmployeeRole[];
}

const EmployeeSheet = ({ model, onSubmit, roles }: Props) => {
  const query = useQuery({
    queryKey: ["employee-management", model.id],
    queryFn: () => employeeManagementService.getEmployee(model.id.toString()),
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
          <SheetTitle>Personel Bilgisi</SheetTitle>
          <SheetDescription>
            Buradan personel bilgilerini düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        {query.data ? (
          <EmployeeForm
            model={query.data.data}
            onSubmit={onSubmit}
            roles={roles}
          />
        ) : (
          <div className="w-full h-full relative z-10">
            <LoadingScreen />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
