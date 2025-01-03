"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { EyeIcon } from "lucide-react";
import PatientFeedbackForm from "./my-reports-form";

const PatientFeedbackMyAllReportsSheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={() => setOpen(true)}>
          <EyeIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent className="min-w-full max-w-[90vw] p-6">
          <SheetHeader>
            <SheetTitle>Tüm Bildirimlerim</SheetTitle>
            <SheetDescription>
              Buradan Tüm Bildirimlerinizi Görüntüleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <PatientFeedbackForm />
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Kapat</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <TooltipContent>Görüntüle</TooltipContent>
    </Tooltip>
  );
};

export default PatientFeedbackMyAllReportsSheet;
