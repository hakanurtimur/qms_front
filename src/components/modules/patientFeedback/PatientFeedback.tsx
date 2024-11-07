"use client";

import {
  PatientFeedbackFilterForm,
  PatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import PatientFiltering from "@/components/modules/patientFeedback/PatientFiltering";
import PatientInformation from "@/components/modules/patientFeedback/PatientInformation";
import FormContainerCard from "@/components/ui/form-container-card";
import { useEffect, useRef } from "react";
import PatientDetailsForm from "@/app/modules/2/components/patient-details-form";

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
      <div className="md:w-fit w-full flex flex-row  ">
        <div className="w-full flex flex-row pt-12 border-4 border-black-800 shadow-2xl p-10 px-14 rounded-md">
          <div className="w-full flex flex-row justify-center gap-8 ">
            <div className="w-56 h-[475px] ">
              <PatientFiltering
                onSubmitFilter={(data) => {
                  onSubmitFilter(data);
                }}
                onReset={onReset}
              />
            </div>

            {patientModel && (
              <>
                <div className="w-full flex-row flex gap-10">
                  <div className="w-1 h-92  bg-gray-200 flex flex-row items-center justify-center">
                  </div>
                  <PatientDetailsForm
                    containerRef={containerRef}
                    onSubmitPatient={onSubmitPatient}
                    patientModel={patientModel}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFeedback;
