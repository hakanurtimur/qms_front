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
import { UpdateWaitingRequestModel } from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";
import waitingRequestsService from "@/services/user/documents/waiting-requests/WaitingRequestsService";
import WaitingRequestSheetForm from "@/app/(app)/user/documents/waiting-requests/_components/waiting-request-sheet/waiting-request-sheet-form";

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

const WaitingRequestSheet = ({
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
  const requestDetailsQuery = useQuery({
    queryKey: ["requestDetails", id],
    queryFn: async () => waitingRequestsService.get(id, user?.roleId ?? ""),
  });

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
        {requestDetailsQuery.data && (
          <WaitingRequestSheetForm
            variant={variant}
            model={requestDetailsQuery.data.data}
            onSubmit={onSubmit}
            superAdminActionOpts={superAdminActionOpts}
            superAdminAboutOpts={superAdminAboutOpts}
            handleGetGarbage={handleGetGarbage}
            handleGetFile={handleGetFile}
            documentTypeListQpts={documentTypeListQpts}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WaitingRequestSheet;
