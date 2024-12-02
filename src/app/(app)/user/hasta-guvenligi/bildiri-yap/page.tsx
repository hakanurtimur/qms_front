"use client";

import IncidentReport from "./_components/IncidentReport";
import EmployeeReport from "./_components/EmployeeReport";
import {
  IncidentForm,
  IncidentFormEmployee,
  IncidentFormFilter,
  IncidentFormPatient,
} from "@/models/incidentForm";
import PatientReport from "./_components/PatientReport";
import React, { useState } from "react";

const DUMMY_PATIENT: IncidentFormPatient = {
  name: "Hakan Urtimur",
  bornDate: "04.01.1997",
  patientNum: "12345678901",
  phoneNum: "0532 123 45 67",
  date: "",
  incidentPlace: "",
  incidentDescription: "",
  file: undefined,
  isSecondaryVictim: "false",
  secondaryVictimName: "",
};

const Page = () => {
  const [patient, setPatient] = useState<IncidentFormPatient | null>(null);

  const [selectedTab] = useState<string | number>("patient");

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

  const handleEmployeeReportSubmit = (data: IncidentFormEmployee) => {
    console.log(data);
  };

  const handleIncidentReportSubmit = (data: IncidentForm) => {
    console.log(data);
  };

  return (
    <div className="md:relative h-full w-full bg-white">
      {/* İçerik Katmanı */}
      <div className="md:relative z-10 w-full flex md:flex-row flex-col justify-between">
        <div className="md:w-full w-full h-full p-4 flex items-center justify-center">
          {selectedTab === "general" && (
            <div className="md:w-[500px] w-full border-4 p-5 border-black-900 rounded-lg shadow-2xl md:mr-52 bg-white">
              <IncidentReport onSubmit={handleIncidentReportSubmit} />
            </div>
          )}
          {selectedTab === "patient" && (
            <div
              className={
                "md:w-fit md:min-h-[500px] w-full h-full  border-4 p-5 border-black-900 rounded-lg shadow-2xl bg-white" +
                (patient ? "" : " ")
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
          {selectedTab === "employee" && (
            <div className="md:w-fit md:h-fit w-full h-full border-4 p-10 border-black-900 rounded-lg shadow-2xl md:mr-52 bg-white">
              <EmployeeReport onSubmit={handleEmployeeReportSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
