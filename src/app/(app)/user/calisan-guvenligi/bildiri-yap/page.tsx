"use client";

import EmployeeReport from "./_components//EmployeeReport";
import { IncidentFormEmployee } from "@/models/incidentForm";
import React from "react";

export default function page() {
  const handleEmployeeReportSubmit = (data: IncidentFormEmployee) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex w-full h-full justify-center items-center">
        <div className="md:w-fit justify-center md:h-fit w-full h-full border-4 p-10 border-black-900 rounded-lg shadow-2xl  bg-white">
          <EmployeeReport onSubmit={handleEmployeeReportSubmit} />
        </div>
      </div>
    </div>
  );
}
