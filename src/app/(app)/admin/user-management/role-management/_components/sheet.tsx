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
import { useQuery } from "@tanstack/react-query";
import roleManagementService from "@/services/admin/RoleManagement";

interface Props {
  model: RoleManagementRoleModel;
  onSubmit: (data: RoleManagementRoleModel) => void;
}

const RoleSheet = ({ model, onSubmit }: Props) => {
  const query = useQuery({
    queryKey: ["roles", model.roleId.toString()],
    queryFn: () => roleManagementService.get(model.roleId.toString()),
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
          <SheetTitle>Rol İşlemleri</SheetTitle>
          <SheetDescription>
            Buradan rol bilgilerini güncelleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        {query.data && (
          <SheetForm model={query.data.data} onSubmit={onSubmit} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RoleSheet;
