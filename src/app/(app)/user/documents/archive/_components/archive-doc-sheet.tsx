"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { DialogOverlay } from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import ArchiveDocForm from "./archive-form";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export interface ArchiveDocSheetProps {
  data: RequestDocumentListModel;
}

export default function ArchiveDocSheet({ data }: ArchiveDocSheetProps) {
  const [open, setOpen] = useState(false);
  /* not modelleri ve sheeti incele */

  return (
    <Tooltip>
      <TooltipTrigger>
        <EditIcon
          onClick={() => setOpen(true)}
          className="w-8 h-8 p-2 rounded-md bg-primary-800 text-white cursor-pointer "
        />
      </TooltipTrigger>
      <TooltipContent>Düzenle</TooltipContent>

      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Arşivleme</SheetTitle>
            <SheetDescription>
              Dokümanın arşivlenme işlemlerini buradan yapabilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <ArchiveDocForm data={data} />
        </SheetContent>
      </Sheet>
    </Tooltip>
  );
}
