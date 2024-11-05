"use client";

import {
  PatientFeedbackFilterForm,
  PatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import PatientFiltering from "@/components/modules/patientFeedback/PatientFiltering";
import PatientInformation from "@/components/modules/patientFeedback/PatientInformation";
import FormContainerCard from "@/components/ui/form-container-card";
import { useEffect, useRef } from "react";
import NewPatientForm from "@/app/modules/2/components/NewPatientForm";

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
    <div className={"w-full flex flex-row items-center justify-center "}>
      <div className="md:w-fit w-full flex flex-row ">
        <FormContainerCard className="w-full flex flex-row ">
          <h1 className="text-2xl font-semibold text-center w-full my-1 mb-16 ">
            Hasta Geri Bildirim Formu
          </h1>
          <div className="w-full flex flex-row  justify-center gap-6 pe-14">
            <PatientFiltering

              onSubmitFilter={(data) => {
                onSubmitFilter(data);
              }}
              onReset={onReset}
            />

            {patientModel && (
              <>
                <div className="w-1 h-80  bg-black-50 rounded flex flex-row items-center justify-center">
                </div>
                <NewPatientForm

                  containerRef={containerRef}
                  onSubmitPatient={onSubmitPatient}
                  patientModel={patientModel}
                />
              </>
            )}
          </div>
        </FormContainerCard>
      </div>
    </div>
  );
};

export default PatientFeedback;
