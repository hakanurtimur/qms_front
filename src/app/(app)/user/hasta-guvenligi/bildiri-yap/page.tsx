"use client";

import IncidentReport from "./_components/IncidentReport";
import EmployeeReport from "./_components/EmployeeReport";
import {
  IncidentForm,
  IncidentFormEmployee,
  IncidentFormFilter,
  IncidentFormPatient,
} from "@/models/incidentForm";
import PatientReport from "./_components/PatientReport";
import React, { useEffect, useState } from "react";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import useEventSceneTypeList from "@/app/modules/3/hooks/useEventSceneTypeList";
import useFeedBackTypeList from "@/app/modules/3/hooks/useEventTypeList";
import {
  EventSceneListModel,
  PatientModel,
  PatientSafetyFeedbackInsertRequestModel,
  PatientSafetyFeedbackPatientRequestModel,
} from "@/models/modules/3/PatientSafetyFeedbackModels";
import usePatientSafetyGeneralFeedBackInsert from "@/app/modules/3/hooks/usePatientSafetyGeneralFeedBackInsert";
import { useAuth } from "@/context/authContext";
import useUserList from "@/app/modules/2/hooks/useUserList";
import usePatientGetById from "@/app/modules/3/hooks/usePatientGeyById";
import usePatientSafetyPatientFeedBackInsert from "@/app/modules/3/hooks/usePatientSafetyPatientFeedbackInsert";

const Page = () => {
  const [patient, setPatient] = useState<PatientModel | null>(null);

  const [selectedTab, setSelectedTab] = useState<string | number>("");
  const [generalFeedbackFormData, setGeneralFeedbackFormData] =
    useState<PatientSafetyFeedbackInsertRequestModel | null>(null);
  const auth = useAuth();
  const [patientFeedbackFormData, setPatientFeedbackFormData] =
    useState<PatientSafetyFeedbackInsertRequestModel | null>(null);
  const [protocolId, setProtocolId] = useState<string | null>(null);
  //-----Hooks-----
  const feedbackTypeListQuery = useFeedBackTypeList({
    key: ["feedbackTypeList-for-patient-safety-feedback"],
  });

  const eventSceneTypeListQuery = useEventSceneTypeList({
    key: ["eventSceneTypeList-for-patient-safety-feedback"],
  });

  const patientSafetyGeneralFeedBackInsert =
    usePatientSafetyGeneralFeedBackInsert({
      key: ["patientSafetyGeneralFeedBackInsert-for-patient-safety-feedback"],
      data: generalFeedbackFormData as PatientSafetyFeedbackInsertRequestModel,
      userId: auth.user?.userId,
    });

  const patientSafetuPatientFeedBackInsertMutation =
    usePatientSafetyPatientFeedBackInsert({
      key: ["patientSafetyPatientFeedBackInsert-for-patient-safety-feedback"],
      data: patientFeedbackFormData as PatientSafetyFeedbackPatientRequestModel,
      userId: auth.user?.userId,
    });

  const patientGetByIdMutation = usePatientGetById({
    key: ["patientGetById-for-patient-safety-feedback"],
    protocolId: protocolId as string,
  });

  const userListQuery = useUserList({
    key: ["userList-for-patient-safety-feedback"],
  });

  const handleSubmitPatientFilter = (data: IncidentFormFilter) => {
    setProtocolId(data.protocolNum);
    patientGetByIdMutation.mutate();
  };

  useEffect(() => {
    if (patientGetByIdMutation.isSuccess) {
      setPatient(patientGetByIdMutation.data?.data as PatientModel);
    }
  }, [patientGetByIdMutation.isSuccess]);

  const handlePatientReportSubmit = (data: IncidentFormPatient) => {
    console.log("Patient Report Submit", data);
    const req: PatientSafetyFeedbackPatientRequestModel = {
      typeId: Number(selectedTab),
      victimState: data.isSecondaryVictim == "true" ? 1 : 0,
      victimUserId: data.secondaryVictimName || 0,
      description: data.incidentDescription,
      eventSceneId: data.incidentPlace,
      eventDate: data.date,
      fileName: data.file?.name || "",
      formFile: data?.file as File,
      protocolId: protocolId || "",
    };
    setPatientFeedbackFormData(req);
    patientSafetuPatientFeedBackInsertMutation.mutate();
  };

  useEffect(() => {
    if (
      patientSafetuPatientFeedBackInsertMutation.isSuccess ||
      patientSafetyGeneralFeedBackInsert.isSuccess
    ) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [
    patientSafetuPatientFeedBackInsertMutation.isSuccess,
    patientSafetyGeneralFeedBackInsert.isSuccess,
  ]);

  const handleResetPatientForm = () => {
    setPatient(null);
  };

  const handleEmployeeReportSubmit = (data: IncidentFormEmployee) => {
    console.log(data);
  };

  const handleIncidentReportSubmit = (data: IncidentForm) => {
    const req: PatientSafetyFeedbackInsertRequestModel = {
      typeId: Number(selectedTab),
      description: data.incidentDescription,
      eventSceneId: data.incidentPlace,
      eventDate: data.date,
      fileName: data.file?.name || "",
      formFile: data.file as File,
    };
    setGeneralFeedbackFormData(req);
    patientSafetyGeneralFeedBackInsert.mutate();
  };

  const handleTabChange = (value: string | number) => {
    setSelectedTab(value);
  };

  return (
    <div className="md:relative h-full w-full bg-white">
      {/* İçerik Katmanı */}
      <div className="md:relative z-10 w-full flex md:flex-row flex-col justify-between">
        <div className="md:w-1/6 w-4/5 p-4">
          <DynamicCombobox
            name="incidentType"
            options={
              feedbackTypeListQuery.data?.data.reduce(
                (acc, item) => ({
                  ...acc,
                  [item.typeId]: item.typeName,
                }),
                {},
              ) || {}
            }
            label="Olaydan etkilenen"
            onChange={(value) => handleTabChange(value)}
            width="[300px] md:w-full"
          />
        </div>
        <div className="md:w-5/6 w-full h-full p-4 flex items-center justify-center">
          {selectedTab === 1 && (
            <div className="md:w-[500px] w-full border-4 p-10 border-black-900 rounded-lg shadow-2xl md:mr-52 bg-white">
              <IncidentReport
                eventSceneTypeList={eventSceneTypeListQuery?.data?.data || []}
                onSubmit={handleIncidentReportSubmit}
                refreshForm={
                  patientSafetyGeneralFeedBackInsert.isSuccess ? true : false
                }
              />
            </div>
          )}
          {selectedTab === 2 && (
            <div
              className={
                "md:w-fit md:min-h-[500px] w-full h-full  border-4 p-10 border-black-900 rounded-lg shadow-2xl bg-white" +
                (patient ? "" : " md:mr-52")
              }
            >
              <PatientReport
                onSubmitFilter={handleSubmitPatientFilter}
                eventSceneTypeList={
                  eventSceneTypeListQuery?.data
                    ?.data as unknown as EventSceneListModel
                }
                userList={userListQuery?.data?.data || []}
                patientFormModel={patient as PatientModel}
                onResetPatientForm={handleResetPatientForm}
                onPatientReportSubmit={handlePatientReportSubmit}
              />
            </div>
          )}
          {selectedTab === "employee" && (
            <div className="md:w-fit md:h-fit w-full h-full border-4 p-10 border-black-900 rounded-lg shadow-2xl md:mr-52 bg-white">
              <EmployeeReport onSubmit={handleEmployeeReportSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
