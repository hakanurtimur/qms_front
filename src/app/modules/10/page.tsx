"use client";
import EmployeeReport from "@/components/modules/incident/EmployeeReport";
import { IncidentFormEmployee } from "@/models/incidentForm";
import React from "react";
import useUserList from "../2/hooks/useUserList";
import useEventSceneTypeList from "../3/hooks/useEventSceneTypeList";

const Page = () => {
  const handleEmployeeReportSubmit = (data: IncidentFormEmployee) => {
    console.log(data);
  };
  //--Hooks--
  const userListQuery = useUserList({
    key: ["userList-for-employee-safety-feedback"],
  });
  const eventSceneTypeListQuery = useEventSceneTypeList({
    key: ["eventSceneTypeList-for-employee-safety-feedback"],
  });

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="md:w-fit justify-center md:h-fit w-full h-full border-4 p-10 border-black-900 rounded-lg shadow-2xl  bg-white">
        <EmployeeReport
          eventSceneTypeList={eventSceneTypeListQuery.data?.data || []}
          userList={userListQuery.data?.data || []}
          onSubmit={handleEmployeeReportSubmit}
        />
      </div>
    </div>
  );
};

export default Page;
