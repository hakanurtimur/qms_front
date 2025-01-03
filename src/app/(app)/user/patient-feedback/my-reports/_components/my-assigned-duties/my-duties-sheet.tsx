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
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import PatientFeedbackMyDutiesForm from "./my-duties-form";

const PatientFeedbackMyDutiesSheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={() => setOpen(true)}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Atanan Görevlerim</SheetTitle>
            <SheetDescription>
              Buradan Görevinizin bilgilerini inceleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <PatientFeedbackMyDutiesForm />
        </SheetContent>
      </Sheet>
      <TooltipContent>İncele</TooltipContent>
    </Tooltip>
  );
};

export default PatientFeedbackMyDutiesSheet;
