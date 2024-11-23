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
import WaitingRequestSheetForm from "@/app/(app)/user/documents/waiting-requests/_components/waiting-request-sheet/waiting-request-sheet-form";
import { WaitingRequestModelUpdate } from "@/models/user/waitingRequests/waitingRequestModel";

interface Props {
  model: WaitingRequestModelUpdate;
  onSubmit: (data: WaitingRequestModelUpdate) => void;
  variant: "default" | "actives";
}

const WaitingRequestSheet = ({ model, onSubmit, variant }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[1100px]">
        <SheetHeader>
          <SheetTitle>Talep Bilgileri</SheetTitle>
          <SheetDescription>
            Buradan talepleri düzenleyebilirsiniz.
          </SheetDescription>
        </SheetHeader>
        <WaitingRequestSheetForm
          variant={variant}
          model={model}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};

export default WaitingRequestSheet;
