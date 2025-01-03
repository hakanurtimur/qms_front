"use client";
import React from "react";

import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { patientSafetyDummyData } from "@/models/user/patient-safety-notification/my-notifications/my-notifications";
import LoadingText from "@/components/ui/loading-text";

const MyReportsContent = () => {
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
      </div>

      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Atanan Görevlerim</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value={"all"}
          className="animate-in slide-in-from-bottom-16 duration-500"
        >
          {patientSafetyDummyData ? (
            <DataTable
              columns={columns}
              data={patientSafetyDummyData}
              variant="all"
            />
          ) : (
            <LoadingText />
          )}
        </TabsContent>
        <TabsContent
          value={"actives"}
          className="animate-in slide-in-from-bottom-16 duration-500"
        >
          {patientSafetyDummyData ? (
            <DataTable
              columns={columns}
              data={patientSafetyDummyData}
              variant={"actives"}
            />
          ) : (
            <LoadingText />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyReportsContent;
