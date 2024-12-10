"use client";

import PatientFeedback from "@/components/modules/patientFeedback/PatientFeedback";
import { PatientFeedbackForm } from "@/models/patientFeedbackForm";
import { useState } from "react";
import useUserList from "./hooks/useUserList";
import {
  PatientFeedbackByIdModel,
  PatientFeedbackByIdRequestModel,
  PatientFeedbackInsertRequestModel,
} from "@/models/modules/2/PatientFeedbackModels";
import usePatientFeedbackGetById from "./hooks/usePatientFeedbackGetById";
import useFeedBackTypeList from "./hooks/useFeedBackTypeList";
import useFeedbackInsert from "./hooks/useFeedbackInsert";

const Page = () => {
  const [filterFormDate, setFilterFormDate] =
    useState<PatientFeedbackByIdRequestModel | null>(null);
  const [insertFormDate, setInsertFormDate] =
    useState<PatientFeedbackInsertRequestModel | null>(null);

  const onSubmitFilter = (data: PatientFeedbackByIdRequestModel) => {
    setFilterFormDate(data);
    getPatientFeedbackByIdMutation.mutate();
  };

  const onSubmitPatient = (data: PatientFeedbackForm) => {
    console.log(data);
    const req: PatientFeedbackInsertRequestModel = {
      userId: filterFormDate?.userId ?? "",
      protocolId: getPatientFeedbackByIdMutation.data?.data.protocolId ?? "",
      phoneNumber: data.phoneNum ?? "",
      feedbackTypeId: data.reportType ?? 0,
      description: data.description ?? "",
    };
    setInsertFormDate(req);
    insertFeedbackMutation.mutate();
    // 1 saniyelik timeout ekledim. Çünkü feedback insert işlemi başarılı olduğunda

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
    userId: filterFormDate?.userId ?? "",
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
