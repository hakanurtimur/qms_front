"use client";
import EmployeeReport from "@/components/modules/incident/EmployeeReport";
import { IncidentFormEmployee } from "@/models/incidentForm";
import React from "react";
import useUserList from "../2/hooks/useUserList";
import useEventSceneTypeList from "../3/hooks/useEventSceneTypeList";
import { EmployeeFeedbackInsertRequestModel } from "@/models/modules/10/EmployeeFeedbackModels";
import useEmployeeFeedbackInsert from "./hooks/useEmployeeFeedbackInsert";

const Page = () => {
  const [employeeReport, setEmployeeReport] =
    React.useState<EmployeeFeedbackInsertRequestModel>();
  //--Functions--
  const handleEmployeeReportSubmit = (data: IncidentFormEmployee) => {
    const req: EmployeeFeedbackInsertRequestModel = {
      personelUserId: data.employeeName,
      incidentUserId: data.affectedPerson,
      eventSceneId: data.incidentPlace,
      description: data.incidentDescription,
      eventDate: data.date,
      fileName: data.file?.name || "",
      formFile: data.file,
    };
    setEmployeeReport(req);
    employeeFeedbackInsertMutation.mutate();
  };
  //--Hooks--
  const userListQuery = useUserList({
    key: ["userList-for-employee-safety-feedback"],
  });
  const eventSceneTypeListQuery = useEventSceneTypeList({
    key: ["eventSceneTypeList-for-employee-safety-feedback"],
  });
  const employeeFeedbackInsertMutation = useEmployeeFeedbackInsert({
    keys: ["employeeFeedbackInsert-for-employee-safety-feedback"],
    data: employeeReport || ({} as EmployeeFeedbackInsertRequestModel),
  });

  React.useEffect(() => {
    if (employeeFeedbackInsertMutation.isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [employeeFeedbackInsertMutation.isSuccess]);

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
