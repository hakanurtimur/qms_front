"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArchiveDocTable from "./_components/archive-doc-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  const tabs = [
    { name: "Listele", key: "archive", content: "Archive Content" },
  ];

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="w-fit flex flex-col space-y-10">
        <Button variant="primary">Listele</Button>
        {/*  */}
      </div>
      <div className="w-full flex flex-col space-y-10">
        <ArchiveDocTable />
      </div>
    </div>
  );
}
Tabs;
