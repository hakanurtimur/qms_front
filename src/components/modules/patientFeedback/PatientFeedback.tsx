"use client";

import {
  PatientFeedbackFilterForm,
  PatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import PatientFiltering from "@/components/modules/patientFeedback/PatientFiltering";
import PatientInformation from "@/components/modules/patientFeedback/PatientInformation";
import FormContainerCard from "@/components/ui/form-container-card";
import { useEffect, useRef } from "react";

interface Props {
  onSubmitFilter: (data: PatientFeedbackFilterForm) => void;
  patientModel: PatientFeedbackForm | null;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  onReset: () => void;
}

const PatientFeedback = ({
  onSubmitFilter,
  patientModel,
  onSubmitPatient,
  onReset,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (patientModel && containerRef.current) {
      const timeoutId = setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [patientModel]);

  return (
    <div className={"w-full flex flex-col items-center justify-center"}>
      <div className="md:w-1/2 w-full">
        <FormContainerCard title={"Hasta Geri Bildirimi"} className="w-full">
          <PatientFiltering
            onSubmitFilter={(data) => {
              onSubmitFilter(data);
            }}
            onReset={onReset}
          />
          {patientModel && (
            <PatientInformation
              containerRef={containerRef}
              onSubmitPatient={onSubmitPatient}
              patientModel={patientModel}
            />
          )}
        </FormContainerCard>
      </div>
    </div>
  );
};

export default PatientFeedback;
