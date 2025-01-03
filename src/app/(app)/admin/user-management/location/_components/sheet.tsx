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
import React, { useState } from "react";
import { ManagerLocationModel } from "@/models/admin/location";
import { useAdminUpdateLocation } from "@/app/(app)/admin/user-management/location/lib/hooks/useAdminUpdateLocation";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { useAdminGetLocations } from "@/app/(app)/admin/user-management/location/lib/hooks/useAdminGetLocations";
import SheetForm from "@/app/(app)/admin/user-management/location/_components/sheet-form";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  model: ManagerLocationModel;
}

const FormSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const { refetch: refecthLocations } = useAdminGetLocations();
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useAdminUpdateLocation(
    () => {
      toast({
        title: "Başarılı",
        description: "Lokasyon başarıyla güncellendi",
        variant: "success",
      });
      refecthLocations().then();
    },
    () => {
      toast({
        title: "Hata",
        description: "Lokasyon güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmit = (data: ManagerLocationModel) => {
    if (!user) return;
    mutation.mutate({ userId: user.userId, data });
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
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Lokasyon Düzenle</SheetTitle>
            <SheetDescription>
              Buradan lokasyon bilgilerini düzenleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <SheetForm model={model} onSubmit={handleSubmit} />
        </SheetContent>
      </Sheet>
    </Tooltip>
  );
};

export default FormSheet;
