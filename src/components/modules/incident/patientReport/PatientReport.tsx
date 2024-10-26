"use client";

import { useEffect, useRef } from "react";
import FormContainerCard from "@/components/ui/form-container-card";
import PatientReportFilter from "@/components/modules/incident/patientReport/PatientReportFilter";
import PatientReportIncident from "@/components/modules/incident/patientReport/PatientReportIncident";
import { IncidentFormFilter, IncidentFormPatient } from "@/models/incidentForm";

interface Props {
  onSubmitFilter: (data: IncidentFormFilter) => void;
  onResetPatientForm: () => void;
  patientFormModel: IncidentFormPatient | null;
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
    <div className="w-full">
      <FormContainerCard title={"Olay Bildirimi"}>
        <PatientReportFilter
          onSubmitFilter={onSubmitFilter}
          onResetPatientForm={onResetPatientForm}
        />
        {patientFormModel && (
          <PatientReportIncident
            patientFormModel={patientFormModel}
            containerRef={containerRef}
            onPatientReportSubmit={onPatientReportSubmit}
          />
        )}
      </FormContainerCard>
    </div>
  );
};

export default PatientReport;
