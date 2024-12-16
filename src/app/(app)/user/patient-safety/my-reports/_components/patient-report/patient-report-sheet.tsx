"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PatientForm from "./patient-report-form";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { PatientSecuritySheetModel } from "@/models/user/patient-safety-notification/sheet-model/patient-security-sheet-model";
import { DialogOverlay } from "@radix-ui/react-dialog";
interface PatientSheetProps {
  model: PatientSecuritySheetModel;
}

const PatientSheet: React.FC<PatientSheetProps> = ({ model }) => {
  return (
    <Sheet>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="bg-primary-900 hover:bg-primary-800"
          variant="outline"
        >
          <UserCircleIcon className="w-4 h-4 text-white" />
        </Button>
      </SheetTrigger>
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
  );
};

export default PatientSheet;
