"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/admin/user-management/employee-management/_components/data-table";
import React from "react";
import { Columns } from "@/app/(app)/admin/user-management/employee-management/_components/columns";
import GuestSheet from "@/app/(app)/admin/user-management/employee-management/_components/guest/guest-sheet";
import { useAdminGetEmployees } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetEmployees";
import { useAdminGetManagers } from "@/app/(app)/admin/user-management/employee-management/lib/hooks/useAdminGetManagers";
import LoadingText from "@/components/ui/loading-text";

const EmployeeManagementContent = () => {
  const employeesQuery = useAdminGetEmployees();
  const managerQuery = useAdminGetManagers();

  return (
    <Tabs className={"h-full"} defaultValue="employee">
      <div className="w-full flex justify-between items-center">
        <TabsList className="grid grid-cols-2 w-[480px]">
          <TabsTrigger value="employee">Personel</TabsTrigger>
          <TabsTrigger value="manager">Yönetici</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        className="animate-in slide-in-from-bottom-16 duration-500"
        value="employee"
      >
        {employeesQuery.data ? (
          <>
            <div className="flex w-full justify-end my-2">
              <GuestSheet />
            </div>
            <DataTable
              data={employeesQuery.data.data}
              columns={Columns}
              variant={"employee"}
            />
          </>
        ) : (
          <LoadingText />
        )}
      </TabsContent>
      <TabsContent
        value="manager"
        className="pt-11 animate-in slide-in-from-bottom-16 duration-500"
      >
        {managerQuery.data ? (
          <DataTable
            data={managerQuery.data.data}
            columns={Columns}
            variant={"manager"}
          />
        ) : (
          <LoadingText />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeManagementContent;
