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
import React from "react";
import RequestForm from "@/app/(app)/user/documents/documents/_components/request-form";
import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";

interface Props {
  onSubmit: (data: { userId: string; formData: RequestDocumentCreate }) => void;
  documentTypeOpts: { [key: number]: string };
}

const NewRequestSheet = ({ onSubmit, documentTypeOpts }: Props) => {
  return (
    <Sheet>
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
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewRequestSheet;
