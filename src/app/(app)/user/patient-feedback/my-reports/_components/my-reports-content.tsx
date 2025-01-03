"use client";
import React from "react";

import { columns } from "../../_components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { patientFeedbackDummyData } from "@/models/user/patient-feedback/my-notifications/my-notifications";

const PatientFeedbackMyReportsContent = () => {
  //TODO: query data
  const exampleDataArray = [patientFeedbackDummyData];

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
            <TabsTrigger value="all">Tüm Bildirimlerim</TabsTrigger>
            <TabsTrigger value="actives">Atanan Görevlerim</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value={"all"}
          className="animate-in slide-in-from-bottom-16 duration-500"
        >
          {exampleDataArray ? (
            <DataTable
              columns={columns}
              data={exampleDataArray}
              variant="all"
            />
          ) : null}
        </TabsContent>
        <TabsContent
          value={"actives"}
          className="animate-in slide-in-from-bottom-16 duration-500"
        >
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

export default PatientFeedbackMyReportsContent;
