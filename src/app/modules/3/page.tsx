"use client";

import IncidentReport from "@/components/modules/incident/IncidentReport";
import {
  IncidentForm,
  IncidentFormFilter,
  IncidentFormPatient,
} from "@/models/incidentForm";
import PatientReport from "@/components/modules/incident/patientReport/PatientReport";
import React, { useState } from "react";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import useFeedBackTypeList from "./hooks/useEventTypeList";
import useEventSceneTypeList from "./hooks/useEventSceneTypeList";
import { PatientSafetyFeedbackInsertRequestModel } from "@/models/modules/3/PatientSafetyFeedbackModels";
import usePatientSafetyGeneralFeedBackInsert from "./hooks/usePatientSafetyGeneralFeedBackInsert";

const DUMMY_PATIENT: IncidentFormPatient = {
  name: "Hakan Urtimur",
  bornDate: "04.01.1997",
  patientNum: "12345678901",
  phoneNum: "0532 123 45 67",
  date: "",
  incidentPlace: 1,
  incidentDescription: "",
  file: undefined,
  isSecondaryVictim: "false",
  secondaryVictimName: "",
};

const Page = () => {
  const [patient, setPatient] = useState<IncidentFormPatient | null>(null);

  const [selectedTab, setSelectedTab] = useState<string | number>("");
  const [generalFeedbackFormData, setGeneralFeedbackFormData] =
    useState<PatientSafetyFeedbackInsertRequestModel | null>(null);

  //hooks
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

  const handleSubmitPatientFilter = (data: IncidentFormFilter) => {
    console.log(data);
    setPatient(DUMMY_PATIENT);
    console.log(patient);
  };

  const handlePatientReportSubmit = (data: IncidentFormPatient) => {
    console.log(data);
  };

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
