"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { EyeIcon } from "lucide-react";
import PatientFeedbackMyReportsForm from "./my-reports-form";

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
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Tüm Bildirimlerim</SheetTitle>
            <SheetDescription>
              Buradan Tüm Bildirimlerinizi Görüntüleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <PatientFeedbackMyReportsForm />
        </SheetContent>
      </Sheet>
      <TooltipContent>Görüntüle</TooltipContent>
    </Tooltip>
  );
};

export default PatientFeedbackMyAllReportsSheet;
