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
import { ScreenToManageModel } from "@/models/admin/moduleManagement/screenToManageModel";
import ScreenForm from "@/app/(app)/admin/user-management/module-management/_components/screen/screenSheet/screen-form";

interface Props {
  model: ScreenToManageModel;
  onSubmit: (data: ScreenToManageModel) => void;
}

const ScreenUpdateSheet = ({ model, onSubmit }: Props) => {
  return (
    <Sheet>
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
        <ScreenForm model={model} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default ScreenUpdateSheet;
