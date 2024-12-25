"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
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

export interface ArchiveDocSheetProps {
  data: RequestDocumentListModel;
}

export default function ArchiveDocSheet({ data }: ArchiveDocSheetProps) {
  /* not modelleri ve sheeti incele */

  return (
    <Tooltip>
      <Sheet>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetTrigger asChild className="">
          <TooltipTrigger>
            <EditIcon className="w-8 h-8 p-2 rounded-md bg-primary-800 text-white cursor-pointer " />
          </TooltipTrigger>
        </SheetTrigger>
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
      <TooltipContent>Düzenle</TooltipContent>
    </Tooltip>
  );
}
