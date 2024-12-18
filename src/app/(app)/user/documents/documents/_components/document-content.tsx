"use client";
import React, { useEffect, useState } from "react";

import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { DataTable } from "@/app/(app)/user/documents/documents/_components/data-table";
import { columns } from "@/app/(app)/user/documents/documents/_components/columns";
import { Button } from "@/components/ui/button";
import NewRequestSheet from "@/app/(app)/user/documents/documents/_components/newDocRequest/new-request-sheet";
import { useAuth } from "@/context/authContext";

import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import { toast } from "@/hooks/use-toast";
import PdfViewer from "@/components/ui/pdf-viewer";
import useDocumentTypes from "@/app/(app)/user/documents/hooks/useDocumentTypes";
import { useUserCreateDocument } from "../lib/hooks/useUserCreateDocument";
import { useUserUpdateDocument } from "../lib/hooks/useUserUpdateDocument";
import { useUserGetDocuments } from "../lib/hooks/useUserGetDocuments";
import useGetFile from "../../hooks/useGetFile";

const DocumentContentPage = () => {
  // TODO: add query service
  const { user } = useAuth();

  const [show, setShow] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const { documentTypeOpts } = useDocumentTypes();
  const { fileUrl, fileName, getFileMutation } = useGetFile({
    handleShow: () => setShow(true),
    key: ["getDocUrl"],
  });
  const {
    fileUrl: printFileUrl,
    fileName: printFileName,
    getFileMutation: printFileMutation,
  } = useGetFile({
    handleShow: () => setShowPrint(true),
    key: ["getDocUrl", "print"],
  });

  const query = useUserGetDocuments(user?.roleId ?? "");

  /*
    useQuery({
    queryKey: ["user-documents"],
    queryFn: () => requestDocumentService.list(user?.roleId ?? ""),
  });
  */

  useEffect(() => {
    query.refetch();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1 saniye

    return () => clearTimeout(timer); // Temizleme
  }, []);

  console.log("query", query.data?.data);
  const categories = query.data?.data.map((doc) => doc.categoryName);

  const folderNames = query.data?.data.map((doc) => doc.folderName);
  console.log("folderNames", folderNames);
  console.log("categories", categories);

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;
  const folderOpts = folderNames
    ? convertStringArrayToOptions(folderNames)
    : null;

  const createDocumentMutation = useUserCreateDocument(async () => {
    await query.refetch();
    toast({
      title: "Başarılı",
      description: "Doküman revize talebi başarıyla oluşturuldu",
      variant: "success",
    });
  });

  const reviseDocumentMutation = useUserUpdateDocument(async () => {
    await query.refetch();
    toast({
      title: "Başarılı",
      description: "Doküman revize talebi başarıyla oluşturuldu",
      variant: "success",
    });
  });

  const handleGetDocument = (fileId: string) => {
    getFileMutation.mutate(fileId);
  };

  const handlePrintibleDocument = (fileId: string) => {
    printFileMutation.mutate(fileId);
  };

  const handleCreateDocument = (data: {
    userId: string;
    formData: RequestDocumentCreate;
  }) => {
    createDocumentMutation.mutate(data);
  };

  const handleReviseDocument = (data: {
    userId: string;
    formData: RequestDocumentCreate;
  }) => {
    reviseDocumentMutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Listele
        </Button>
        {documentTypeOpts && (
          <NewRequestSheet
            onSubmit={(data: {
              userId: string;
              formData: RequestDocumentCreate;
            }) => {
              handleCreateDocument(data);
            }}
            documentTypeOpts={documentTypeOpts}
          />
        )}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">Yükleniyor...</div>
      ) : query.data && categroyOpts && folderOpts && documentTypeOpts ? (
        <DataTable
          categoryOpts={categroyOpts}
          folderOpts={folderOpts}
          columns={columns}
          data={query?.data?.data}
          onGetDocument={handleGetDocument}
          onPrintibleDocument={handlePrintibleDocument}
          getDocumentLoading={
            getFileMutation.isPending || printFileMutation.isPending
          }
          onReviseDocument={handleReviseDocument}
          documentTypeOpts={documentTypeOpts}
        />
      ) : (
        <div className="flex items-center justify-center">...</div>
      )}
      {getFileMutation.data && (
        <PdfViewer
          data={getFileMutation.data.data}
          open={show}
          onOpenChange={() => setShow(false)}
          fileName={fileName ?? null}
          src={fileUrl ?? ""}
        />
      )}
      {printFileMutation.data && (
        <PdfViewer
          data={printFileMutation.data.data}
          variant={"printible"}
          open={showPrint}
          onOpenChange={() => setShowPrint(false)}
          fileName={printFileName ?? null}
          src={printFileUrl ?? ""}
        />
      )}
    </div>
  );
};

export default DocumentContentPage;
