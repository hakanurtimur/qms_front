"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";
import SheetForm from "@/app/(app)/admin/user-management/role-management/_components/sheet-form";
import { useAdminUpdateRole } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminUpdateRole";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useAdminGetRolesList } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminGetRolesList";
import { useAdminGetSingleRole } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminGetSingleRole";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Props {
  model: RoleManagementRoleModel;
}

const RoleSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const { refetch: refetchRoles } = useAdminGetRolesList();
  const [open, setOpen] = useState<boolean>(false);
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={() => setOpen(true)}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Düzenle</TooltipContent>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
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
    </Tooltip>
  );
};

export default RoleSheet;
