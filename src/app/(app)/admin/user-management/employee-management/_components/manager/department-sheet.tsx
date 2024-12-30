"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import DepartmentForm from "@/app/(app)/admin/user-management/employee-management/_components/manager/department-form";
import { useAdminGetSingleManager } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetSingleManager";
import { useAuth } from "@/context/authContext";
import { useAdminUpdateManagerDepartment } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminUpdateManagerDepartment";
import { toast } from "@/hooks/use-toast";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  model: EmployeeToManageTableModel;
}

const DepartmentSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const query = useAdminGetSingleManager(model.id);
  const [open, setOpen] = useState<boolean>(false);
  const { refetch: refetchManagers } = useAdminGetSingleManager(model.id);
  const updateManagerDepartmentMutation = useAdminUpdateManagerDepartment(
    () => {
      toast({
        title: "Başarılı",
        description: "Departman başarıyla güncellendi",
        variant: "success",
      });
      refetchManagers().then();
      query.refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Departman güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );
  const handleSubmit = (formData: EmployeeToManageTableModel) => {
    if (!user) return;
    const data: {
      id: number;
      departmentId: number;
    } = {
      id: formData.id,
      departmentId: formData.departmentId,
    };
    updateManagerDepartmentMutation.mutate({
      id: user.userId,
      data,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={() => setOpen(true)}>
          <BriefcaseIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Bölüm Atama</TooltipContent>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 z-50 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Bölüm Atama</SheetTitle>
            <SheetDescription>
              Buradan yönetici için bölüm ataması yapılır.
            </SheetDescription>
          </SheetHeader>
          {query.data ? (
            <DepartmentForm model={query.data.data} onSubmit={handleSubmit} />
          ) : null}
        </SheetContent>
      </Sheet>
    </Tooltip>
  );
};

export default DepartmentSheet;
