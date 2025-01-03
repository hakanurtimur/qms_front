"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { DialogOverlay } from "@/components/ui/dialog";
import GeneralForm from "./general-report-form";
import { GeneralSheetModel } from "@/models/user/patient-safety-notification/sheet-model/patient-security-general-sheet-model";
import { Button } from "@/components/ui/button";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeneralSheetProps {
  model: GeneralSheetModel;
}

const GeneralSheet: React.FC<GeneralSheetProps> = ({ model }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          className="bg-primary-900 hover:bg-primary-800"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <GlobeAltIcon className="w-4 h-4 text-white" />
        </Button>
      </TooltipTrigger>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent className="min-w-[850px] max-w-[90vw] p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Bildirim Detayı</h2>
            <p className="text-sm text-gray-500">
              Bildirimleri buradan görüntüleyebilirsiniz.
            </p>
          </div>

          <GeneralForm model={model} />

          <div className="col-span-12 flex justify-end mt-6">
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button">Kapat</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
      <TooltipContent>Genel</TooltipContent>
    </Tooltip>
  );
};

export default GeneralSheet;
