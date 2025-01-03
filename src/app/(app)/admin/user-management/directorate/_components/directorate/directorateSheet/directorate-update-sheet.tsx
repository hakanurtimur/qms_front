"use client";

import { Button } from "@/components/ui/button";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DirectorateForm from "./directorate-form";

interface DirectorateModel {
  id: string;
  departmentName: string;
  email: string;
}

interface Props {
  model: DirectorateModel;
}

const DirectorateUpdateSheet = ({ model }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (data: DirectorateModel) => {
    console.log(data);
    setOpen(false);
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Bölüm İşlem</SheetTitle>
            <SheetDescription>
              Buradan bölüm bilgilerini güncelleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <DirectorateForm model={model} onSubmit={handleSubmit} />
        </SheetContent>
      </Sheet>
    </Tooltip>
  );
};

export default DirectorateUpdateSheet;
