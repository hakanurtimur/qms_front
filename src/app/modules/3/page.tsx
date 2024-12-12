"use client";

import IncidentReport from "@/components/modules/incident/IncidentReport";
import {
  IncidentForm,
  IncidentFormFilter,
  IncidentFormPatient,
} from "@/models/incidentForm";
import PatientReport from "@/components/modules/incident/patientReport/PatientReport";
import React, { useEffect, useState } from "react";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import useFeedBackTypeList from "./hooks/useEventTypeList";
import useEventSceneTypeList from "./hooks/useEventSceneTypeList";
import {
  EventSceneListModel,
  PatientModel,
  PatientSafetyFeedbackInsertRequestModel,
} from "@/models/modules/3/PatientSafetyFeedbackModels";
import usePatientSafetyGeneralFeedBackInsert from "./hooks/usePatientSafetyGeneralFeedBackInsert";
import usePatientGetById from "./hooks/usePatientGeyById";
import useUserList from "../2/hooks/useUserList";

const Page = () => {
  const [patient, setPatient] = useState<PatientModel | null>(null);

  const [selectedTab, setSelectedTab] = useState<string | number>("");
  const [generalFeedbackFormData, setGeneralFeedbackFormData] =
    useState<PatientSafetyFeedbackInsertRequestModel | null>(null);
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
    });

  const patientSafetuPatientFeedBackInsertMutation =
    usePatientSafetyGeneralFeedBackInsert({
      key: ["patientSafetyPatientFeedBackInsert-for-patient-safety-feedback"],
      data: patientFeedbackFormData as PatientSafetyFeedbackInsertRequestModel,
    });

  const patientGetByIdMutation = usePatientGetById({
    key: ["patientGetById-for-patient-safety-feedback"],
    protocolId: protocolId as string,
  });

  const userListQuery = useUserList({
    key: ["userList-for-patient-safety-feedback"],
  });

  const handleSubmitPatientFilter = (data: IncidentFormFilter) => {
    console.log(data);
    setProtocolId(data.protocolNum);
    patientGetByIdMutation.mutate();
    setPatient(patientGetByIdMutation.data?.data as PatientModel);
  };

  useEffect(() => {
    if (patientGetByIdMutation.isSuccess) {
      setPatient(patientGetByIdMutation.data?.data as PatientModel);
    }
  }, [patientGetByIdMutation.isSuccess]);

  const handlePatientReportSubmit = (data: IncidentFormPatient) => {
    console.log("Patient Report Submit", data);
    const req: PatientSafetyFeedbackInsertRequestModel = {
      typeId: 2,
      description: data.incidentDescription,
      eventSceneId: data.incidentPlace,
      eventDate: data.date,
      fileName: data.file?.name || "",
      formFile: data.file as File,
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

  const handleIncidentReportSubmit = (data: IncidentForm) => {
    const req: PatientSafetyFeedbackInsertRequestModel = {
      typeId: 1,
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
                patientFormModel={patient}
                onResetPatientForm={handleResetPatientForm}
                onPatientReportSubmit={handlePatientReportSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
