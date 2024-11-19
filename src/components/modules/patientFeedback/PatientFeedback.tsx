"use client";

import {
  PatientFeedbackFilterForm,
  PatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import PatientFiltering from "@/components/modules/patientFeedback/PatientFiltering";
import { useRef } from "react";
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

  return (
    <div
      className={
        "w-full flex md:flex-row flex-col items-center justify-center "
      }
    >
      <div className="md:w-fit w-full flex md:flex-row flex-col ">
        <div className="w-full flex flex-row pt-12 border-4 border-black-800 shadow-2xl p-10 px-14 rounded-md">
          <div className="w-full flex md:flex-row flex-col justify-center gap-8 ">
            <div className="md:w-56 w-52 md:h-[475px] h-full ">
              <PatientFiltering
                onSubmitFilter={(data) => {
                  onSubmitFilter(data);
                }}
                onReset={onReset}
              />
            </div>

            {patientModel && (
              <>
                <div className="w-full md:flex-row flex-col flex gap-10">
                  <div className="md:w-1 md:h-full w-full h-1 rounded bg-black-200 text-black-800"></div>
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
