"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/ui/pageHeader";

export default function Page() {
  const tabs = [
    { name: "Listele", key: "archive", content: "Archive Content" },
  ];

  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Arşivleme"}
        description={"Arşivleme işlemlerinizi buradan yönetebilirsiniz."}
      />
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
          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              <div>{tab.content}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
