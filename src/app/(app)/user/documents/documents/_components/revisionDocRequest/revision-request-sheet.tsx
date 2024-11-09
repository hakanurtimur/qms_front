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
import RequestForm from "@/app/(app)/user/documents/documents/_components/request-form";
import { RequestDocumentModel } from "@/models/user/documents/requestDocument";

interface Props {
  onSubmit: (data: RequestDocumentModel) => void;
}

const RevisionRequestSheet = ({ onSubmit }: Props) => {
  return (
    <Sheet>
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
        <RequestForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default RevisionRequestSheet;
