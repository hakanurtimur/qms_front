"use client";

import useUserList from "@/app/modules/2/hooks/useUserList";
import EmployeeReport from "./_components//EmployeeReport";
import { IncidentFormEmployee } from "@/models/incidentForm";
import React from "react";
import useEventSceneTypeList from "@/app/modules/3/hooks/useEventSceneTypeList";
import useEmployeeFeedbackInsert from "@/app/modules/10/hooks/useEmployeeFeedbackInsert";
import { EmployeeFeedbackInsertRequestModel } from "@/models/modules/10/EmployeeFeedbackModels";
import { useAuth } from "@/context/authContext";

const Page = () => {
  const [employeeReport, setEmployeeReport] =
    React.useState<EmployeeFeedbackInsertRequestModel>();
  const auth = useAuth();
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
    userId: Number(auth.user?.userId),
  });

  React.useEffect(() => {
    if (employeeFeedbackInsertMutation.isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [employeeFeedbackInsertMutation.isSuccess]);

  return (
    <div>
      <div className="flex w-full h-full justify-center items-center">
        <div className="md:w-fit justify-center md:h-fit w-full h-full border-4 p-10 border-black-900 rounded-lg shadow-2xl  bg-white">
          <EmployeeReport
            eventSceneTypeList={eventSceneTypeListQuery.data?.data || []}
            userList={userListQuery.data?.data || []}
            onSubmit={handleEmployeeReportSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
