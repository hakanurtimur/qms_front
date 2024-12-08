"use client";
import React from "react";

import { ModuleDataTable } from "@/app/(app)/admin/user-management/module-management/_components/module/module-data-table";
import { moduleColumns } from "@/app/(app)/admin/user-management/module-management/_components/module/module-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import { ScreenDataTable } from "@/app/(app)/admin/user-management/module-management/_components/screen/screen-data-table";
import { screenColumns } from "@/app/(app)/admin/user-management/module-management/_components/screen/screen-columns";

const Page = () => {
  // TODO: add query service

  // const query = useQuery({
  //   queryKey: ["documents"],
  //   queryFn: () => documentService.getDocuments(moduleId),
  // });

  const moduleQuery = {
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

  const screenQuery = {
    data: {
      data: [
        {
          typeName: "Patient Records",
          moduleName: "Medical History",
          subModuleName: "Allergies",
          roleName: "Doctor",
          state: true,
        },
        {
          typeName: "Treatment Plan",
          moduleName: "Surgery",
          subModuleName: "Post-Operative Care",
          roleName: "Nurse",
          state: false,
        },
        {
          typeName: "Billing Information",
          moduleName: "Insurance",
          subModuleName: "Claims Processing",
          roleName: "Billing Staff",
          state: true,
        },
      ],
    },
  };

  const moduleNames = moduleQuery.data?.data.map((doc) => doc.moduleName);

  const moduleNameOpts = moduleNames
    ? convertStringArrayToOptions(moduleNames)
    : null;

  const screenTypeNames = screenQuery.data?.data.map((doc) => doc.typeName);

  const screenTypeOpts = screenTypeNames
    ? convertStringArrayToOptions(screenTypeNames)
    : null;

  const screenModuleNames = screenQuery.data?.data.map((doc) => doc.moduleName);

  const screenModuleOpts = screenModuleNames
    ? convertStringArrayToOptions(screenModuleNames)
    : null;

  const screenSubModuleNames = screenQuery.data?.data.map(
    (doc) => doc.subModuleName,
  );

  const screenSubModuleOpts = screenSubModuleNames
    ? convertStringArrayToOptions(screenSubModuleNames)
    : null;

  const screenRoleNames = screenQuery.data?.data.map((doc) => doc.roleName);

  const screenRoleOpts = screenRoleNames
    ? convertStringArrayToOptions(screenRoleNames)
    : null;

  return (
    <div className="w-full flex flex-col space-y-10">
      <Tabs defaultValue="modules">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="modules">Modüller</TabsTrigger>
            <TabsTrigger value="screens">Ekranlar</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"modules"}>
          {moduleQuery.data && moduleNameOpts ? (
            <ModuleDataTable
              moduleNameOpts={moduleNameOpts}
              columns={moduleColumns}
              data={moduleQuery.data.data}
            />
          ) : null}
        </TabsContent>
        <TabsContent value={"screens"}>
          {screenQuery.data &&
          screenModuleOpts &&
          screenTypeOpts &&
          screenSubModuleOpts &&
          screenRoleOpts ? (
            <ScreenDataTable
              columns={screenColumns}
              screenModuleOpts={screenModuleOpts}
              screenTypeOpts={screenTypeOpts}
              screenSubModuleOpts={screenSubModuleOpts}
              screenRoleOpts={screenRoleOpts}
              data={screenQuery.data.data}
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
