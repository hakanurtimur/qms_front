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

interface Props {
  onSubmit: (data: RoleManagementRoleModel) => void;
}

const CreateRoleSheet = ({ onSubmit }: Props) => {
  return (
    <Sheet>
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
        <CreateSheetForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateRoleSheet;
