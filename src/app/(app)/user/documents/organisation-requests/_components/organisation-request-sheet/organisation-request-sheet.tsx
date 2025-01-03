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
import { UpdateWaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";

import { DialogOverlay } from "@/components/ui/dialog";
import OrganisationRequestSheetForm from "@/app/(app)/user/documents/organisation-requests/_components/organisation-request-sheet/organisation-request-sheet-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  id: string;
  onSubmit: (data: UpdateWaitingRequestModel) => void;
  variant: "default" | "actives";
  superAdminActionOpts: { [key: number]: string };
  superAdminAboutOpts: { [key: number]: string };
  handleGetGarbage: (fileId: string) => void;
  handleGetFile: (fileId: string) => void;
  documentTypeListQpts?: { [key: number]: string };
}

const OrganisationRequestSheet = ({
  id,
  onSubmit,
  variant,
  superAdminActionOpts,
  superAdminAboutOpts,
  handleGetGarbage,
  handleGetFile,
  documentTypeListQpts,
}: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const requestDetailsQuery = useQuery({
    queryKey: ["requestDetails", "get", id],
    queryFn: () => waitingRequestsService.get(id, user?.roleId ?? ""),
  });

  const handleRefresh = async () => {
    await requestDetailsQuery.refetch();
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={requestDetailsQuery.isPending}
          onClick={() => setOpen(true)}
          size={"icon"}
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
              Buradan talepleri düzenleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          {requestDetailsQuery.data && (
            <OrganisationRequestSheetForm
              variant={variant}
              model={requestDetailsQuery.data.data}
              onSubmit={onSubmit}
              superAdminActionOpts={superAdminActionOpts}
              superAdminAboutOpts={superAdminAboutOpts}
              handleGetGarbage={handleGetGarbage}
              handleGetFile={handleGetFile}
              documentTypeListQpts={documentTypeListQpts}
              handleRefresh={handleRefresh}
            />
          )}
        </SheetContent>
      </Sheet>
    </Tooltip>
  );
};

export default OrganisationRequestSheet;
