"use client";

import PatientFeedback from "@/components/modules/patientFeedback/PatientFeedback";
import {
  PatientFeedbackFilterForm,
  PatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import { useState } from "react";

const DUMMY_PATIENT_DATA: PatientFeedbackForm = {
  name: "Hakan Urtimur",
  bornDate: "04.01.1997",
  patientNum: "123456",
  phoneNum: undefined,
  reportType: undefined,
  description: undefined,
};

const Page = () => {
  const [patientModel, setPatientModel] = useState<PatientFeedbackForm | null>(
    null,
  );

  const onSubmitFilter = (data: PatientFeedbackFilterForm) => {
    console.log(data);
    setPatientModel(DUMMY_PATIENT_DATA);
  };

  const onSubmitPatient = (data: PatientFeedbackForm) => {
    console.log(data);
  };

  const handleReset = () => {
    setPatientModel(null);
    console.log("WORKS");
  };

  return (
    <div>
      <PatientFeedback
        onSubmitFilter={onSubmitFilter}
        patientModel={patientModel}
        onSubmitPatient={onSubmitPatient}
        onReset={handleReset}
      />
    </div>
  );
};

export default Page;
