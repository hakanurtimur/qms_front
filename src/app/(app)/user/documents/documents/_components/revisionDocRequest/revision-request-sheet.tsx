"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import RequestForm from "@/app/(app)/user/documents/documents/_components/request-form";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  onSubmit: (data: { userId: string; formData: RequestDocumentCreate }) => void;
  model: RequestDocumentListModel;
  documentTypeOpts: { [key: number]: string };
}

const RevisionRequestSheet = ({ onSubmit, model, documentTypeOpts }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetTrigger asChild className="">
          <TooltipTrigger asChild>
            <Button size={"icon"}>
              <ClipboardDocumentListIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Revize Talebi</SheetTitle>
            <SheetDescription>
              Buradan yeni Revize talebi oluşturabilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <RequestForm
            documentTypeOpts={documentTypeOpts}
            variant={"revision"}
            onSubmit={onSubmit}
            model={model}
            onSheetClose={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
      <TooltipContent>Revize Talebi</TooltipContent>
    </Tooltip>
  );
};

export default RevisionRequestSheet;
