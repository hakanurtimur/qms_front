import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
    queryKey: ["requestDetails", id],
    queryFn: async () => waitingRequestsService.get(id, user?.roleId ?? ""),
  });

  return (
    <Sheet
      onOpenChange={async () => {
        await requestDetailsQuery.refetch();
        setOpen(!open);
      }}
      open={open}
    >
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <SheetTrigger asChild>
        <Button size={"icon"}>
          {variant === "default" ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <PencilSquareIcon className="w-4 h-4" />
          )}
        </Button>
      </SheetTrigger>
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
            onSheetClose={() => setOpen(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default OrganisationRequestSheet;
