import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import RequestSheetForm from "@/app/(app)/user/documents/requests/_components/request-sheet/request-sheet-form";
import { UpdateDocumentDemandModel } from "@/models/user/documents/userRequests/userRequestModel";
import { useQuery } from "@tanstack/react-query";
import requestDocumentService from "@/services/user/documents/request-document/RequestDocumentsService";
import { DialogOverlay } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  id: string;
  onSubmit: (data: UpdateDocumentDemandModel) => void;
  variant: "default" | "actives";
  documentTypeListOpts: { [key: string]: string };
  actionTypeListOpts: { [key: string]: string };
  handleGetGarbage: (fileId: string) => void;
  handleGetFile: (fileId: string) => void;
}

const RequestSheet = ({
  id,
  onSubmit,
  variant,
  documentTypeListOpts,
  actionTypeListOpts,
  handleGetGarbage,
  handleGetFile,
}: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const query = useQuery({
    queryKey: ["documents", "get", id],
    queryFn: () =>
      requestDocumentService.getDocumentDemandDetails(id, user?.roleId ?? ""),
  });

  const handleRefresh = async () => {
    await query.refetch();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={query.isPending}
          onClick={() => setOpen(true)}
          size="icon"
        >
          {variant === "default" ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <PencilSquareIcon
              onClick={() => setOpen(true)}
              className="w-4 h-4"
            />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {variant === "default" ? "Görüntüle" : "Düzenle"}
      </TooltipContent>
      <Sheet
        open={open}
        onOpenChange={async (isOpen) => {
          if (!isOpen) {
            await handleRefresh();
          }
          setOpen(isOpen);
        }}
      >
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent className="min-w-[1100px]">
          <SheetHeader>
            <SheetTitle>Talep Bilgileri</SheetTitle>
            <SheetDescription>
              Buradan taleplteri düzenleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          {query.data && (
            <>
              <RequestSheetForm
                variant={variant}
                model={query.data.data}
                onSubmit={onSubmit}
                documentTypeListOpts={documentTypeListOpts}
                actionTypeListOpts={actionTypeListOpts}
                handleGetGarbage={handleGetGarbage}
                handleGetFile={handleGetFile}
                handleRefresh={handleRefresh}
              />
            </>
          )}
        </SheetContent>
      </Sheet>
    </Tooltip>
  );
};

export default RequestSheet;
