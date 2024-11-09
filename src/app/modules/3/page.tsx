"use client";

import IncidentReport from "@/components/modules/incident/IncidentReport";
import EmployeeReport from "@/components/modules/incident/EmployeeReport";
import {
  IncidentForm,
  IncidentFormEmployee,
  IncidentFormFilter,
  IncidentFormPatient,
} from "@/models/incidentForm";
import PatientReport from "@/components/modules/incident/patientReport/PatientReport";
import React, { useState } from "react";
import Combobox from "@/components/ui/combobox";
import { Control, useForm } from "react-hook-form";
import { any } from "zod";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";

const DUMMY_PATIENT: IncidentFormPatient = {
  name: "Hakan Urtimur",
  bornDate: "04.01.1997",
  patientNum: "12345678901",
  phoneNum: "0532 123 45 67",
  date: "",
  incidentPlace: "",
  incidentDescription: "",
  file: undefined,
};

const Page = () => {
  const [patient, setPatient] = useState<IncidentFormPatient | null>(null);
  const [open, setOpen] = React.useState(false);

  const [selectedTab, setSelectedTab] = useState("");

  const handleSubmitPatientFilter = (data: IncidentFormFilter) => {
    console.log(data);
    setPatient(DUMMY_PATIENT);
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

  const handleTabChange = (value: any) => {
    setSelectedTab(value);
  };

  const handleTabSelect = (value: string) => {
    setSelectedTab(value);
  };

  const options = {
    general: "Genel",
    patient: "Hasta",
    employee: "Çalışan",
  };

  return (
    <div className="relative h-full w-full bg-white">
      {/* İçerik Katmanı */}
      <div className="relative z-10 w-full flex justify-between">
        <div className="w-1/6 p-4">
          <DynamicCombobox
            name="incidentType"
            options={options}
            label="Olaydan etkilenen"
            onChange={handleTabChange}
          />
        </div>
        <div className="w-5/6 p-4 flex items-center justify-center">
          {selectedTab === "general" && (
            <div className="w-[500px] border-4 p-10 border-black-900 rounded-lg shadow-2xl mr-52 bg-white">
              <IncidentReport onSubmit={handleIncidentReportSubmit} />
            </div>
          )}
          {selectedTab === "patient" && (

            <PatientReport
              onSubmitFilter={handleSubmitPatientFilter}
              onResetPatientForm={handleResetPatientForm}
              patientFormModel={DUMMY_PATIENT}
              onPatientReportSubmit={handlePatientReportSubmit}
            />
          )}
          {selectedTab === "employee" && (
            <div className="w-full h-[500px] border-4 p-10 border-black-900 rounded-lg shadow-2xl mr-52 bg-white">
              <EmployeeReport onSubmit={handleEmployeeReportSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
