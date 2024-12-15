import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import RejectionSheetContent from "@/app/(app)/user/documents/director-rejection/_components/rejection-sheet/rejection-sheet-content";
import useGetRequestDetails from "@/app/(app)/user/documents/director-rejection/lib/hooks/useGetSingleRejectionRequest";
import { useAuth } from "@/context/authContext";
import { DirectorRejectionModel } from "@/models/user/documents/director-rejection/director-rejection";
import useGetFile from "@/app/(app)/user/documents/hooks/useGetFile";
import useGetGarbage from "@/app/(app)/user/documents/hooks/useGetGarbage";
import PdfViewer from "@/components/ui/pdf-viewer";

interface Props {
  model: DirectorRejectionModel;
  variant: "default" | "actives";
  onApproveRequest: (id: string, action_id: number) => void;
}

const RejectionSheet = ({ model, variant, onApproveRequest }: Props) => {
  const { user } = useAuth();
  const query = useGetRequestDetails(model.id.toString(), user?.roleId ?? "");
  const [show, setShow] = useState(false);
  const [showFile, setShowFile] = useState(false);

  const handleShow = () => setShow(true);

  const handleShowFile = () => setShowFile(true);
  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: handleShowFile,
    key: ["getDocUrl"],
  });
  const { garbageSrc, garbageFileName, getGarbageMutation } = useGetGarbage({
    handleShow,
    userId: user?.userId ?? "",
  });

  const handleGetGarbage = (fileId: string) => {
    getGarbageMutation.mutate(fileId);
  };
  const handleGetFile = (fileId: string) => {
    getFileMutation.mutate(fileId);
  };

  return (
    <>
      {getGarbageMutation.data && (
        <PdfViewer
          variant={"view"}
          open={show}
          onOpenChange={() => setShow(false)}
          fileName={garbageFileName ?? null}
          src={garbageSrc ?? ""}
        />
      )}
      {getFileMutation.data && (
        <PdfViewer
          variant={"view"}
          open={showFile}
          onOpenChange={() => setShowFile(false)}
          fileName={fileName ?? null}
          src={fileUrl ?? ""}
        />
      )}
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
          {query.data && (
            <RejectionSheetContent
              onGetFile={handleGetFile}
              onGetGarbage={handleGetGarbage}
              variant={variant}
              model={query.data.data}
              onApproveRequest={(action_id) =>
                onApproveRequest(model.id.toString(), action_id)
              }
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default RejectionSheet;
