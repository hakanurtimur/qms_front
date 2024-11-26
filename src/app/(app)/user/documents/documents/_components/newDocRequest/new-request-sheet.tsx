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
import { useQuery } from "@tanstack/react-query";
import requestDocuments from "@/services/user/documents/RequestDocuments";
import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";

interface Props {
  onSubmit: (data: { userId: string; formData: RequestDocumentCreate }) => void;
}

const NewRequestSheet = ({ onSubmit }: Props) => {
  const optionsQuery = useQuery({
    queryKey: ["documentTypes"],
    queryFn: async () => requestDocuments.getDocumentTypes(),
  });

  const documentTypeOpts: { [key: number]: string } = optionsQuery.data
    ? optionsQuery.data.data.reduce(
        (acc, item) => {
          acc[item.documentTypeId] = item.documentTypeName;
          return acc;
        },
        {} as { [key: number]: string },
      )
    : {};

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-2">
          <PlusIcon className="w-4 h-4 text-white" /> <p>Dokuman Talebi</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dokuman Talebi</SheetTitle>
          <SheetDescription>
            Buradan yeni dokuman talebi oluşturabilirsiniz.
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
