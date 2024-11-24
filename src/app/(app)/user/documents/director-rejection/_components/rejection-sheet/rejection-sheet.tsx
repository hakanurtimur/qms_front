import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { UserRequestModelUpdate } from "@/models/user/documents/userRequests/userRequestModel";
import RejectionSheetContent from "@/app/(app)/user/documents/director-rejection/_components/rejection-sheet/rejection-sheet-content";

interface Props {
  model: UserRequestModelUpdate;
  variant: "default" | "actives";
}

const RejectionSheet = ({ model, variant }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[1100px]">
        <SheetHeader>
          <SheetTitle>Yönetici Onay Red</SheetTitle>
        </SheetHeader>
        <RejectionSheetContent variant={variant} model={model} />
      </SheetContent>
    </Sheet>
  );
};

export default RejectionSheet;
