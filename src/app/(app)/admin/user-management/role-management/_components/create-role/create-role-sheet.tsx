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
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";
import CreateSheetForm from "@/app/(app)/admin/user-management/role-management/_components/create-role/create-sheet-form";
import { useAdminCreateRole } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminCreateRole";
import { toast } from "@/hooks/use-toast";
import { useAdminGetRolesList } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminGetRolesList";
import { useAuth } from "@/context/authContext";
import { DialogOverlay } from "@/components/ui/dialog";
const CreateRoleSheet = () => {
  const { user } = useAuth();
  const { refetch: refetchRoles } = useAdminGetRolesList();

  const createMutation = useAdminCreateRole(
    () => {
      toast({
        title: "Başarılı",
        description: "Rol başarıyla güncellendi",
        variant: "success",
      });
      refetchRoles().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Rol güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmmit = (formData: RoleManagementRoleModel) => {
    if (!user) return;
    const data = {
      roleName: formData.roleName,
    };
    createMutation.mutate({ userId: user.userId, data });
  };

  return (
    <Sheet>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon className="w-4 h-4" />
          <p>Rol Ekle</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rol Ekleme</SheetTitle>
          <SheetDescription>
            Buradan yeni rol ekleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <CreateSheetForm onSubmit={handleSubmmit} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateRoleSheet;
