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
import React from "react";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import RequestForm from "@/app/(app)/user/documents/documents/_components/request-form";
import { DialogOverlay } from "@/components/ui/dialog";

interface Props {
  onSubmit: (data: { userId: string; formData: RequestDocumentCreate }) => void;
  model: RequestDocumentListModel;
  documentTypeOpts: { [key: number]: string };
}

const RevisionRequestSheet = ({ onSubmit, model, documentTypeOpts }: Props) => {
  return (
    <Sheet>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <ClipboardDocumentListIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Revizyon Talebi</SheetTitle>
          <SheetDescription>
            Buradan yeni revizyon talebi oluşturabilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <RequestForm
          documentTypeOpts={documentTypeOpts}
          variant={"revision"}
          onSubmit={onSubmit}
          model={model}
        />
      </SheetContent>
    </Sheet>
  );
};

export default RevisionRequestSheet;
