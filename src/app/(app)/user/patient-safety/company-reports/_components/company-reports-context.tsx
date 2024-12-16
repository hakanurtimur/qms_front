"use client";
import React from "react";

import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { patientSafetyDummyData } from "@/models/user/patient-safety-notification/my-notifications/my-notifications";

const CompanyReportsContext = () => {
  //TODO: query data

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
            <TabsTrigger value="all">Tüm Bildirimler</TabsTrigger>
            <TabsTrigger value="actives">Açık Bildirimler</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"all"}>
          {patientSafetyDummyData ? (
            <DataTable
              columns={columns}
              data={patientSafetyDummyData}
              variant="all"
            />
          ) : null}
        </TabsContent>
        <TabsContent value={"actives"}>
          {patientSafetyDummyData ? (
            <DataTable
              columns={columns}
              data={patientSafetyDummyData}
              variant={"actives"}
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyReportsContext;
