"use client";
import React, { useState } from "react";

import LoadingScreen from "@/components/commons/LoadingScreen";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { DataTable } from "@/app/(app)/user/documents/documents/_components/data-table";
import { columns } from "@/app/(app)/user/documents/documents/_components/columns";
import { Button } from "@/components/ui/button";
import NewRequestSheet from "@/app/(app)/user/documents/documents/_components/newDocRequest/new-request-sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import requestDocumentService from "@/services/user/documents/RequestDocuments";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/app/(app)/user/documents/documents/_components/pdf-viewer";
import { RequestDocumentCreate } from "@/models/user/documents/documents/requestDocumentCreate";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  // TODO: add query service

  const [show, setShow] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["user-documents"],
    queryFn: () => requestDocumentService.list(user?.roleId ?? ""),
  });

  const categories = query.data?.data.map((doc) => doc.categoryName);

  const folderNames = query.data?.data.map((doc) => doc.folderName);

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;
  const folderOpts = folderNames
    ? convertStringArrayToOptions(folderNames)
    : null;

  const getMutation = useMutation({
    mutationKey: ["goDocUrl"],
    mutationFn: (fileId: string) => requestDocumentService.get(fileId),
    onSuccess: (data) => {
      console.log(data);
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.url;
      if (fileUrl && regex.test(fileUrl)) {
        console.log("WORKS1");
        window.open(fileUrl);
        return;
      }
      setShow(true);
    },
  });

  const printMutation = useMutation({
    mutationKey: ["printDocUrl"],
    mutationFn: (fileId: string) => requestDocumentService.get(fileId),
    onSuccess: (data) => {
      console.log(data);
      const fileUrl = data.data.url;

      const regex = /\.(xls|xlsx|csv)$/i;

      if (fileUrl && regex.test(fileUrl)) {
        console.log("WORKS1");
        window.open(fileUrl);
        return;
      }
      setShowPrint(true);
    },
  });

  const createDocumentMutation = useMutation({
    mutationKey: ["createDocument"],
    mutationFn: (data: { userId: string; formData: RequestDocumentCreate }) =>
      requestDocumentService.createDocument(data),
    onSuccess: async (data) => {
      await query.refetch();
      toast({
        title: "Başarılı",
        description: "Doküman başarıyla eklendi",
        variant: "success",
      });
      const { guid } = data.data;
      const { pathName } = data.data;
      console.log(pathName + guid);
    },
  });

  const reviseDocumentMutation = useMutation({
    mutationKey: ["reviseDocument"],
    mutationFn: (data: { userId: string; formData: RequestDocumentCreate }) =>
      requestDocumentService.reviseDocument(data),
    onSuccess: async (data) => {
      await query.refetch();
      toast({
        title: "Başarılı",
        description: "Doküman revize talebi başarıyla oluşturuldu",
        variant: "success",
      });
      const { guid } = data.data;
      const { pathName } = data.data;
      console.log(pathName + guid);
    },
  });

  const handleGetDocument = (fileId: string) => {
    getMutation.mutate(fileId);
  };

  const handlePrintibleDocument = (fileId: string) => {
    printMutation.mutate(fileId);
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
    console.log(data);
    reviseDocumentMutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <Button>Listele</Button>
        <NewRequestSheet
          onSubmit={(data: {
            userId: string;
            formData: RequestDocumentCreate;
          }) => {
            handleCreateDocument(data);
          }}
        />
      </div>
      {query.data && categroyOpts && folderOpts ? (
        <DataTable
          categoryOpts={categroyOpts}
          folderOpts={folderOpts}
          columns={columns}
          data={query.data.data}
          onGetDocument={handleGetDocument}
          onPrintibleDocument={handlePrintibleDocument}
          getDocumentLoading={getMutation.isPending || printMutation.isPending}
          onReviseDocument={handleReviseDocument}
        />
      ) : (
        <LoadingScreen />
      )}
      <PdfViewer
        open={show}
        onOpenChange={() => setShow(false)}
        fileName={getMutation.data?.data.fileName ?? null}
        src={getMutation.data?.data.url ?? ""}
      />
      <PdfViewer
        variant={"printible"}
        open={showPrint}
        onOpenChange={() => setShowPrint(false)}
        fileName={printMutation.data?.data.fileName ?? null}
        src={printMutation.data?.data.url ?? ""}
      />
    </div>
  );
};

export default Page;
