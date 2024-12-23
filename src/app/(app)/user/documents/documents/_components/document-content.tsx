"use client";
import React, { useEffect, useState } from "react";

import { convertStringArrayToOptions } from "@/utils/convertStringArrayToOptions";
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
import LoadingText from "@/components/ui/loading-text";
import useNonLoginGetDocumentCategoryList from "@/app/modules/1/lib/hooks/useNonLoginGetDocumentCategoryList";
import useNonLoginGetDocumentFolderList from "@/app/modules/1/lib/hooks/useNonLoginGetDocumentFolderList";
import { DocumentFolderListModel } from "@/models/document";

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
  const [folderOpts, setFolderOpts] = React.useState<{ [key: string]: string }>(
    {},
  );
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

  /*   const folderNames = query.data?.data.map((doc) => doc.folderName);
   */

  const createDocumentMutation = useUserCreateDocument(
    async () => {
      await query.refetch();
      toast({
        title: "Başarılı",
        description: "Doküman başarıyla oluşturuldu",
        variant: "success",
      });
    },
    () =>
      toast({
        title: "İşlem Gerçekleştirilemedi",
        description: "Doküman oluşturulurken bir hata oluştu",
        variant: "destructive",
      }),
  );

  const documentsCategoryListQuery = useNonLoginGetDocumentCategoryList();

  const documentsFolderListQuery = useNonLoginGetDocumentFolderList();

  const categories = documentsCategoryListQuery.data
    ? documentsCategoryListQuery.data.data.map((doc) => doc.categoryName)
    : [];

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;

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

  const handleChangeCategory = (name: string) => {
    const selectedCategory = documentsCategoryListQuery.data?.data.find(
      (doc) => doc.categoryName === name,
    );
    const categoryId = selectedCategory ? selectedCategory.categoryId : null;
    console.log("Selected Category ID:", categoryId);

    if (categoryId !== null) {
      documentsFolderListQuery.mutate(categoryId, {
        onSuccess: (data) => {
          const newFolderOpts = data.data.reduce(
            (
              acc: { [key: string]: string },
              folder: DocumentFolderListModel,
            ) => {
              acc[folder.folderName] = folder.folderName;
              return acc;
            },
            {},
          );
          setFolderOpts(newFolderOpts);
        },
      });
    }
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
        <LoadingText />
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
          onChangedCategoryName={handleChangeCategory}
        />
      ) : (
        <LoadingText />
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
