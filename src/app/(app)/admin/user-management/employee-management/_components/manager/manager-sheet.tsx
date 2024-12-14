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
import ManagerForm from "@/app/(app)/admin/user-management/employee-management/_components/manager/manager-form";
import { useAdminGetSingleManager } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetSingleManager";
import { useAdminGetEmployees } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetEmployees";
import { useAdminGetManagers } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetManagers";
import { useAdminUpdateManager } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminUpdateManager";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";

interface Props {
  model: EmployeeToManageTableModel;
}

const ManagerSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const query = useAdminGetSingleManager(model.id);
  const { refetch: refetchEmployees } = useAdminGetEmployees();
  const { refetch: refetchManagers } = useAdminGetManagers();
  const updateManagerMutation = useAdminUpdateManager(
    () => {
      toast({
        title: "Başarılı",
        description: "Yönetici başarıyla güncellendi",
        variant: "success",
      });
      refetchEmployees().then();
      refetchManagers().then();
      query.refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Yönetici güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );
  const handleSubmit = (formData: EmployeeToManageTableModel) => {
    if (!user) return;
    const data: {
      id: number;
      roleId: number;
      departmentId: number;
      state: boolean;
    } = {
      id: formData.id,
      roleId: formData.roleId,
      departmentId: formData.departmentId,
      state: formData.workingStatus,
    };
    updateManagerMutation.mutate({
      id: user.userId,
      data,
    });
  };

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
          <ManagerForm model={query.data.data} onSubmit={handleSubmit} />
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default ManagerSheet;
