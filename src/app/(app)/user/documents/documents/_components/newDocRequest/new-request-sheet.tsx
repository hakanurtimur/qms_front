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
import { RequestDocumentModel } from "@/models/user/documents/requestDocument";

interface Props {
  onSubmit: (data: RequestDocumentModel) => void;
}

const NewRequestSheet = ({ onSubmit }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
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
        <RequestForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default NewRequestSheet;
