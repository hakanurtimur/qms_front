"use client";
import React from "react";

import { ModuleDataTable } from "@/app/(app)/admin/user-management/module-management/_components/module/module-data-table";
import { moduleColumns } from "@/app/(app)/admin/user-management/module-management/_components/module/module-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertStringArrayToOptions } from "@/utils/convertStringArrayToOptions";
import { ScreenDataTable } from "@/app/(app)/admin/user-management/module-management/_components/screen/screen-data-table";
import { screenColumns } from "@/app/(app)/admin/user-management/module-management/_components/screen/screen-columns";
import { useAdminGetModules } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminGetModules";
import { useAdminGetScreens } from "@/app/(app)/admin/user-management/module-management/lib/hooks/useAdminGetScreens";
import LoadingText from "@/components/ui/loading-text";
import { Button } from "@/components/ui/button";

const ModuleManagementContent = () => {
  const moduleQuery = useAdminGetModules();
  const screenQuery = useAdminGetScreens();

  const moduleNames = moduleQuery.data?.data.map((doc) => doc.moduleName);

  const moduleNameOpts = moduleNames
    ? convertStringArrayToOptions(moduleNames)
    : null;

  const screenTypeNames = screenQuery.data?.data.map((doc) => doc.pageName);

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
    <>
      <div>
        <Button
          onClick={async () => {
            await moduleQuery.refetch();
            await screenQuery.refetch();
          }}
        >
          Listele
        </Button>
      </div>
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
          ) : (
            <LoadingText />
          )}
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
          ) : (
            <LoadingText />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ModuleManagementContent;
