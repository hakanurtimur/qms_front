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
import React from "react";
import ModuleForm from "@/app/(app)/admin/user-management/module-management/_components/moduleSheet/module-form";
import { ModuleToManageModel } from "@/models/admin/moduleManagement/moduleManagement";

interface Props {
  model: ModuleToManageModel;
  onSubmit: (data: ModuleToManageModel) => void;
}

const ModuleUpdateSheet = ({ model, onSubmit }: Props) => {
  return (
    <Sheet>
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
        <ModuleForm model={model} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default ModuleUpdateSheet;
