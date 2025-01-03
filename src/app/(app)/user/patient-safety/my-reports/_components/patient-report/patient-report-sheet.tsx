"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PatientForm from "./patient-report-form";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { PatientSecuritySheetModel } from "@/models/user/patient-safety-notification/sheet-model/patient-security-sheet-model";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface PatientSheetProps {
  model: PatientSecuritySheetModel;
}

const PatientSheet: React.FC<PatientSheetProps> = ({ model }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          className="bg-primary-900 hover:bg-primary-800"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <UserCircleIcon className="w-4 h-4 text-white" />
        </Button>
      </TooltipTrigger>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 z-50 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent className="min-w-full max-w-[90vw] p-6">
          <SheetHeader>
            <SheetTitle>Bildirim Detayı</SheetTitle>
            <SheetDescription>
              Bildirimleri buradan görüntüleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>

          <PatientForm model={model} />

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Kapat</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <TooltipContent>Hasta</TooltipContent>
    </Tooltip>
  );
};

export default PatientSheet;
