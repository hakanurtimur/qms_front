"use client";

import { PatientFeedbackForm } from "@/models/patientFeedbackForm";

import { useRef } from "react";
import PatientDetailsForm from "./patient-details-form";
import PatientFiltering from "./PatientFiltering";
import {
  FeedbackTypeModel,
  ModulesUserList,
  PatientFeedbackByIdModel,
  PatientFeedbackByIdRequestModel,
} from "@/models/modules/2/PatientFeedbackModels";

interface Props {
  onSubmitFilter: (data: PatientFeedbackByIdRequestModel) => void;
  patientModel: PatientFeedbackByIdModel | null;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  onReset: () => void;
  userList: ModulesUserList[] | undefined;
  feedbackTypes: FeedbackTypeModel[] | undefined;
}

const PatientFeedback = ({
  onSubmitFilter,
  patientModel,
  onSubmitPatient,
  onReset,
  userList,
  feedbackTypes,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={
        "w-full flex md:flex-row flex-col items-center justify-center "
      }
    >
      <div className="md:w-fit w-full flex md:flex-row flex-col ">
        <div className="w-full flex flex-row pt-12 border-4 border-black-800 shadow-2xl p-3  rounded-md">
          <div className="w-full flex md:flex-row flex-col justify-center gap-4 ">
            <div className="md:w-56 w-52 md:h-[475px] h-full ">
              <PatientFiltering
                onSubmitFilter={(data) => {
                  onSubmitFilter(data);
                }}
                onReset={onReset}
                userList={userList}
              />
            </div>
            {patientModel && (
              <div className="md:w-1 md:h-full w-full h-1   rounded bg-black-200 text-black-800"></div>
            )}
            {patientModel && (
              <>
                <div className="w-full md:flex-row flex-col flex ">
                  <PatientDetailsForm
                    containerRef={containerRef}
                    onSubmitPatient={onSubmitPatient}
                    patientModel={patientModel as PatientFeedbackByIdModel}
                    feedbackTypes={feedbackTypes}
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
