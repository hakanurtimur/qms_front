"use client";
import React from "react";

import LoadingScreen from "@/components/commons/LoadingScreen";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { DataTable } from "@/app/(app)/user/documents/documents/_components/data-table";
import { columns } from "@/app/(app)/user/documents/documents/_components/columns";
import { Button } from "@/components/ui/button";
import NewRequestSheet from "@/app/(app)/user/documents/documents/_components/newDocRequest/new-request-sheet";
import { RequestDocumentModel } from "@/models/user/documents/documents/requestDocument";

const Page = () => {
  // TODO: add query service

  // const query = useQuery({
  //   queryKey: ["documents"],
  //   queryFn: () => documentService.getDocuments(moduleId),
  // });

  const query = {
    data: {
      data: [
        {
          fileId: 616,
          categoryName: "RIZA BELGELERİ",
          subCategoryName: null,
          folderName: "ACİL SERVİS",
          fileName:
            "ONM-1093-03 KAS İÇİ (İNTRAMÜSKÜLER) ENJEKSİYON İŞLEMİ İÇİN BİLGİLENDİRME ONAM FORMU.PDF",
          printing: 1,
          reading: 1,
          url: null,
        },
      ],
    },
  };

  const categories = query.data?.data.map((doc) => doc.categoryName);

  const folderNames = query.data?.data.map((doc) => doc.folderName);

  const categroyOpts = categories
    ? convertStringArrayToOptions(categories)
    : null;
  const folderOpts = folderNames
    ? convertStringArrayToOptions(folderNames)
    : null;

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <Button>Listele</Button>
        <NewRequestSheet
          onSubmit={(data: RequestDocumentModel) => {
            console.log(data);
          }}
        />
      </div>
      {query.data && categroyOpts && folderOpts ? (
        <DataTable
          categoryOpts={categroyOpts}
          folderOpts={folderOpts}
          columns={columns}
          data={query.data.data}
        />
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Page;
