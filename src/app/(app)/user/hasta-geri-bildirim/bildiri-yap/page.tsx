"use client";

import { PatientFeedbackForm } from "@/models/patientFeedbackForm";
import { useState } from "react";
import PatientFeedback from "./_components/PatientFeedback";
import {
  PatientFeedbackByIdModel,
  PatientFeedbackByIdRequestModel,
  PatientFeedbackInsertRequestModel,
} from "@/models/modules/2/PatientFeedbackModels";
import useUserList from "@/app/modules/2/hooks/useUserList";
import usePatientFeedbackGetById from "@/app/modules/2/hooks/usePatientFeedbackGetById";
import useFeedBackTypeList from "@/app/modules/2/hooks/useFeedBackTypeList";
import useFeedbackInsert from "@/app/modules/2/hooks/useFeedbackInsert";
import { useAuth } from "@/context/authContext";

const Page = () => {
  const [filterFormDate, setFilterFormDate] =
    useState<PatientFeedbackByIdRequestModel | null>(null);
  const [insertFormDate, setInsertFormDate] =
    useState<PatientFeedbackInsertRequestModel | null>(null);
  const user = useAuth();
  console.log(user);

  const onSubmitFilter = (data: PatientFeedbackByIdRequestModel) => {
    setFilterFormDate(data);
    getPatientFeedbackByIdMutation.mutate();
  };

  const onSubmitPatient = (data: PatientFeedbackForm) => {
    console.log(data);
    const req: PatientFeedbackInsertRequestModel = {
      userId: user.user?.userId ?? "",
      protocolId: getPatientFeedbackByIdMutation.data?.data.protocolId ?? "",
      phoneNumber: data.phoneNum ?? "",
      feedbackTypeId: data.reportType ?? 0,
      description: data.description ?? "",
    };
    setInsertFormDate(req);
    insertFeedbackMutation.mutate();
    // 1 saniyelik timeout ekledim.

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleReset = () => {
    console.log("reset");
  };

  //hooks
  const userListQuery = useUserList({
    key: ["user-list-for-module-2"],
  });

  const getPatientFeedbackByIdMutation = usePatientFeedbackGetById({
    key: ["get-patient-feedback-by-id"],
    identityNumber: filterFormDate?.identityNumber ?? "",
    protocolId: filterFormDate?.protocolId ?? "",
    userId: user.user?.userId ?? "",
  });

  const feedbackTypesQuery = useFeedBackTypeList({
    key: ["feedback-types-list-for-module-2"],
  });

  const insertFeedbackMutation = useFeedbackInsert({
    key: ["insert-feedback-for-module-2"],
    data: (insertFormDate as PatientFeedbackInsertRequestModel) ?? {},
  });

  return (
    <div>
      <PatientFeedback
        onSubmitFilter={onSubmitFilter}
        patientModel={
          getPatientFeedbackByIdMutation?.data?.data as PatientFeedbackByIdModel
        }
        feedbackTypes={feedbackTypesQuery?.data?.data}
        onSubmitPatient={onSubmitPatient}
        onReset={handleReset}
        userList={userListQuery?.data?.data}
      />
    </div>
  );
};

export default Page;
