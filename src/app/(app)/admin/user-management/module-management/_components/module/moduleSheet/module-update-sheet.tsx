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
import ModuleForm from "@/app/(app)/admin/user-management/module-management/_components/module/moduleSheet/module-form";
import { ModuleToManageModel } from "@/models/admin/moduleManagement/moduleToManageModel";
import { useAdminGetSingleModule } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminGetSingleModule";
import { useAdminUpdateModule } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminUpdateModule";
import { useAuth } from "@/context/authContext";
import { useAdminGetModules } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminGetModules";
import { toast } from "@/hooks/use-toast";

interface Props {
  model: ModuleToManageModel;
}

const ModuleUpdateSheet = ({ model }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const query = useAdminGetSingleModule(model.id ?? 0);
  const listQuery = useAdminGetModules();
  const mutation = useAdminUpdateModule(
    () => {
      toast({
        title: "Modül Güncellendi",
        description: "Modül başarıyla güncellendi",
        variant: "success",
      });
      query.refetch().then();
      listQuery.refetch().then();
      setOpen(false);
    },
    () => {
      toast({
        title: "Modül Güncellenemedi",
        description: "Modül güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  );

  const handleSubmit = (data: ModuleToManageModel) => {
    if (!user || !model.id) return;
    mutation.mutate({
      userId: user?.userId ?? "",
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
          <SheetTitle>Modül Bilgileri</SheetTitle>
          <SheetDescription>
            Buradan modülleri düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        {query.data?.data && (
          <ModuleForm model={model} onSubmit={handleSubmit} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ModuleUpdateSheet;
