"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArchiveDocTable from "./_components/archive-doc-table";

export default function Page() {
  const tabs = [
    { name: "Listele", key: "archive", content: "Archive Content" },
  ];

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="w-fit flex flex-col space-y-10">
        <Tabs defaultValue="archive">
          <div className="w-full flex justify-between items-center">
            <TabsList className="grid grid-cols-1 w-full">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.key} value={tab.key}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

        </Tabs>
        {/*  */}
      </div>
      <div className="w-full flex flex-col space-y-10">
          <ArchiveDocTable />
        </div>
    </div>
  );
}
