"use client";
import React from "react";

import LoadingScreen from "@/components/commons/LoadingScreen";
import PageHeader from "@/components/ui/pageHeader";
import { ModuleDataTable } from "@/app/(app)/admin/user-management/module-management/_components/module/module-data-table";
import { moduleColumns } from "@/app/(app)/admin/user-management/module-management/_components/module/module-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";

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
          moduleName: "Test Module",
          state: true,
        },
        {
          moduleName: "Test Module 2",
          state: true,
        },
      ],
    },
  };

  const moduleNames = query.data?.data.map((doc) => doc.moduleName);

  const moduleNameOpts = moduleNames
    ? convertStringArrayToOptions(moduleNames)
    : null;

  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Modül İşlem"}
        description={"Modüllerinizi buradan yönetebilirsiniz."}
      />
      <Tabs defaultValue="modules">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="modules">Modüller</TabsTrigger>
            <TabsTrigger value="screens">Ekranlar</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"modules"}>
          {query.data && moduleNameOpts ? (
            <ModuleDataTable
              moduleNameOpts={moduleNameOpts}
              columns={moduleColumns}
              data={query.data.data}
            />
          ) : (
            <LoadingScreen />
          )}
        </TabsContent>
        <TabsContent value={"screens"}>
          <div>TEST</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
