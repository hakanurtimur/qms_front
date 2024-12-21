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
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import RequestForm from "@/app/(app)/user/documents/documents/_components/request-form";
import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import { DialogOverlay } from "@/components/ui/dialog";

interface Props {
  onSubmit: (data: { userId: string; formData: RequestDocumentCreate }) => void;
  documentTypeOpts: { [key: number]: string };
}

const NewRequestSheet = ({ onSubmit, documentTypeOpts }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <SheetTrigger asChild>
        <Button className="flex gap-2">
          <PlusIcon className="w-4 h-4 text-white" /> <p>Doküman Talebi</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Doküman Talebi</SheetTitle>
          <SheetDescription>
            Buradan yeni doküman talebi oluşturabilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <RequestForm
          documentTypeOpts={documentTypeOpts}
          variant={"default"}
          onSubmit={(data: {
            userId: string;
            formData: RequestDocumentCreate;
          }) => {
            onSubmit(data);
          }}
          onSheetClose={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewRequestSheet;
