"use client";

import { useEffect, useRef } from "react";
import PatientReportFilter from "@/components/modules/incident/patientReport/PatientReportFilter";
import PatientReportIncident from "@/components/modules/incident/patientReport/PatientReportIncident";
import { IncidentFormFilter, IncidentFormPatient } from "@/models/incidentForm";

interface Props {
  onSubmitFilter: (data: IncidentFormFilter) => void;
  onResetPatientForm: () => void;
  patientFormModel?: IncidentFormPatient | null;
  onPatientReportSubmit: (data: IncidentFormPatient) => void;
}

const PatientReport = ({
  onSubmitFilter,
  onResetPatientForm,
  patientFormModel,
  onPatientReportSubmit,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (patientFormModel && containerRef.current) {
      const timeoutId = setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [patientFormModel]);

  return (
    <div className="flex md:flex-row flex-col w-full gap-8 items-start ">
      <div className="w-full ">
        <PatientReportFilter
          onSubmitFilter={onSubmitFilter}
          onResetPatientForm={onResetPatientForm}
        />
      </div>

      {patientFormModel && (
        <div className="w-full flex md:flex-row flex-col gap-4">
          <div
            className="md:w-1 md:h-[450px] w-full h-1
            rounded bg-black-200 text-black-800"
          ></div>
          <PatientReportIncident
            patientFormModel={patientFormModel}
            containerRef={containerRef}
            onPatientReportSubmit={onPatientReportSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default PatientReport;
