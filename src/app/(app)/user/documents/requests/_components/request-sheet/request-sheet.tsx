import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { UserRequestModelUpdate } from "@/models/user/userRequests/userRequestModel";
import RequestSheetForm from "@/app/(app)/user/documents/requests/_components/request-sheet/request-sheet-form";

interface Props {
  model: UserRequestModelUpdate;
  onSubmit: (data: UserRequestModelUpdate) => void;
}

const RequestSheet = ({ model, onSubmit }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-fit">
        <SheetHeader>
          <SheetTitle>Talep Bilgileri</SheetTitle>
          <SheetDescription>
            Buradan taleplteri düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <RequestSheetForm model={model} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};

export default RequestSheet;