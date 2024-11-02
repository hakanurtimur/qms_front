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
import GuestForm from "@/app/(app)/admin/user-management/employee-management/_components/guest/guest-form";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";

interface Props {
  onSubmit: (data: GuestCreated) => void;
}

const GuestSheet = ({ onSubmit }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="gap-2">
          <PlusIcon className="w-4 h-4" />
          <p>Misafir Kullanıcı Ekle</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Misafir Kullanıcı Ekle</SheetTitle>
          <SheetDescription>
            Buradan misafir kullanıcı bilgilerini düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2"></div>
        <GuestForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default GuestSheet;
