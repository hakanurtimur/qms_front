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
import { useAdminCreateGuest } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminCreateGuest";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useAdminGetEmployees } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetEmployees";

const GuestSheet = () => {
  const { user } = useAuth();
  const { refetch: refetchEmployees } = useAdminGetEmployees();
  const createGuestMutation = useAdminCreateGuest(
    () => {
      toast({
        title: "Başarılı",
        description: "Misafir kullanıcı eklendi",
        variant: "success",
      });
      refetchEmployees().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Misafir kullanıcı eklenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmit = (data: GuestCreated) => {
    if (!user) return;
    createGuestMutation.mutate({
      userId: user.userId,
      data,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
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
        <GuestForm onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default GuestSheet;
