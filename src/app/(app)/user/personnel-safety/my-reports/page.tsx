"use client";
import React from "react";

import { columns } from "./_components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./_components/data-table";
import { Button } from "@/components/ui/button";
import { EmployeeExampleData } from "@/models/user/employee-safety-notification/my-notifications/my-notifications";

const Page = () => {
  //TODO: query data
  const exampleDataArray = [EmployeeExampleData];

  return (
    <div className="w-full flex flex-col space-y-10">
      <Button
        className="w-fit px-7"
        onClick={() => {
          window.location.reload();
        }}
      >
        Listele
      </Button>
      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="all">Tüm Bildirimlerim</TabsTrigger>
            <TabsTrigger value="actives">Atanan Görevlerim</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"all"}>
          {exampleDataArray ? (
            <DataTable columns={columns} data={exampleDataArray} />
          ) : null}
        </TabsContent>
        <TabsContent value={"actives"}>
          {exampleDataArray ? (
            <DataTable
              columns={columns}
              data={exampleDataArray}
              variant={"actives"}
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
