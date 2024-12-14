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
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";
import SheetForm from "@/app/(app)/admin/user-management/role-management/_components/sheet-form";
import { useAdminUpdateRole } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminUpdateRole";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useAdminGetRolesList } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminGetRolesList";
import { useAdminGetSingleRole } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminGetSingleRole";

interface Props {
  model: RoleManagementRoleModel;
}

const RoleSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const { refetch: refetchRoles } = useAdminGetRolesList();
  const query = useAdminGetSingleRole(model.roleId);

  const updateMutation = useAdminUpdateRole(
    () => {
      toast({
        title: "Başarılı",
        description: "Rol başarıyla güncellendi",
        variant: "success",
      });
      refetchRoles().then();
      query.refetch().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Rol güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmit = (formData: RoleManagementRoleModel) => {
    if (!user) return;
    const data = {
      roleName: formData.roleName,
      roleId: formData.roleId,
      state: formData.state,
    };
    updateMutation.mutate({ userId: user.userId, data });
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
          <SheetTitle>Rol İşlemleri</SheetTitle>
          <SheetDescription>
            Buradan rol bilgilerini güncelleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        {query.data && (
          <SheetForm model={query.data.data} onSubmit={handleSubmit} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RoleSheet;
