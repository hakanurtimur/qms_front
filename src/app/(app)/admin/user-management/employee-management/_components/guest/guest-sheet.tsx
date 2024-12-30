"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import GuestForm from "@/app/(app)/admin/user-management/employee-management/_components/guest/guest-form";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";
import { useAdminCreateGuest } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminCreateGuest";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useAdminGetEmployees } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetEmployees";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const GuestSheet = () => {
  const { user } = useAuth();
  const { refetch: refetchEmployees } = useAdminGetEmployees();
  const [open, setOpen] = useState<boolean>(false);
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="gap-2" onClick={() => setOpen(true)}>
          <PlusIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 z-50 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
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
      <TooltipContent>Misafir Kullanıcı Ekle</TooltipContent>
    </Tooltip>
  );
};

export default GuestSheet;
