import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { ScreenToManageModel } from "@/models/admin/moduleManagement/screenToManageModel";
import ScreenForm from "@/app/(app)/admin/user-management/module-management/_components/screen/screenSheet/screen-form";
import { useAdminGetSingleScreen } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminGetSingleScreen";
import { useAuth } from "@/context/authContext";
import { useAdminUpdateScreen } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminUpdateScreen";
import { toast } from "@/hooks/use-toast";
import { useAdminGetScreens } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminGetScreens";

interface Props {
  model: ScreenToManageModel;
}

const ScreenUpdateSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const query = useAdminGetSingleScreen(model.id ?? 0);
  const listQuery = useAdminGetScreens();
  const mutation = useAdminUpdateScreen(
    () => {
      toast({
        title: "Başarılı",
        description: "Ekran başarıyla güncellendi.",
        variant: "success",
      });
      query.refetch().then();
      listQuery.refetch().then();
      setOpen(false);
    },
    () => {
      toast({
        title: "Hata",
        description: "Ekran güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  );

  const handleSubmit = (data: ScreenToManageModel) => {
    if (!user || !model.id) return;
    mutation.mutate({
      userId: user?.userId,
      data: {
        id: model.id,
        state: data.state,
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ekran Bilgileri</SheetTitle>
          <SheetDescription>
            Buradan ekranları düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <ScreenForm model={model} onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default ScreenUpdateSheet;
