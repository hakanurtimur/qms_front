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
import EmployeeForm from "@/app/(app)/admin/user-management/employee-management/_components/employee/employee-form";
import { useAdminGetSingleEmployee } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetSingleEmployee";
import { useAuth } from "@/context/authContext";
import { useAdminGetEmployees } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetEmployees";
import { useAdminUpdateEmployee } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminUpdateEmployee";
import { toast } from "@/hooks/use-toast";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Props {
  model: EmployeeToManageTableModel;
}

const EmployeeSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const query = useAdminGetSingleEmployee(model.id);
  const { refetch: refetchEmployees } = useAdminGetEmployees();
  const updateEmployeeMutation = useAdminUpdateEmployee(
    () => {
      toast({
        title: "Başarılı",
        description: "Personel başarıyla güncellendi",
        variant: "success",
      });
      refetchEmployees().then();
      query.refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Personel güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );
  const handleSubmit = (formData: EmployeeToManageTableModel) => {
    if (!user) return;
    const data: {
      id: number;
      roleId: number;
    } = {
      id: formData.id,
      roleId: formData.roleId,
    };
    updateEmployeeMutation.mutate({
      id: user.userId,
      data,
    });
  };

  return (
    <Tooltip>
      <Sheet>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon">
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Personel Bilgisi</SheetTitle>
            <SheetDescription>
              Buradan personel bilgilerini düzenleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          {query.data ? (
            <EmployeeForm model={query.data.data} onSubmit={handleSubmit} />
          ) : null}
        </SheetContent>
      </Sheet>
      <TooltipContent>Düzenle</TooltipContent>
    </Tooltip>
  );
};

export default EmployeeSheet;
