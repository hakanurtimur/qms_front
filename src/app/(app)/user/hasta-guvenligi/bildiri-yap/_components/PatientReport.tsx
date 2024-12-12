"use client";

import { useRef } from "react";
import PatientReportFilter from "./PatientReportFilter";
import PatientReportIncident from "./PatientReportIncident";
import { IncidentFormFilter, IncidentFormPatient } from "@/models/incidentForm";
import {
  EventSceneListModel,
  PatientModel,
} from "@/models/modules/3/PatientSafetyFeedbackModels";
import { ModulesUserList } from "@/models/modules/2/PatientFeedbackModels";

interface Props {
  onSubmitFilter: (data: IncidentFormFilter) => void;
  onResetPatientForm: () => void;
  patientFormModel: PatientModel;
  onPatientReportSubmit: (data: IncidentFormPatient) => void;
  eventSceneTypeList: EventSceneListModel;
  userList: ModulesUserList[];
}

const PatientReport = ({
  onSubmitFilter,
  onResetPatientForm,
  patientFormModel,
  onPatientReportSubmit,
  eventSceneTypeList,
  userList,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log("patientFormModel", patientFormModel);
  return (
    <div
      className={"flex md:flex-row h-full flex-col w-full gap-8 items-start "}
    >
      <div
        className={
          "w-full " + (patientFormModel ? "md:h-[465px]" : "md:h-[200px]")
        }
      >
        <PatientReportFilter
          onSubmitFilter={onSubmitFilter}
          onResetPatientForm={onResetPatientForm}
        />
      </div>

      {patientFormModel && (
        <div className="w-full flex md:flex-row flex-col gap-4 ">
          <div
            className="md:w-1 md:h-[450px] w-full h-1
            rounded bg-black-200 text-black-800 md:no-scrollbar"
          ></div>
          <PatientReportIncident
            eventSceneTypeList={eventSceneTypeList}
            patientFormModel={patientFormModel}
            containerRef={containerRef}
            onPatientReportSubmit={onPatientReportSubmit}
            userList={userList}
          />
        </div>
      )}
    </div>
  );
};

export default PatientReport;
