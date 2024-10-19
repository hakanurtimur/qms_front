"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentReport from "@/components/modules/incident/IncidentReport";
import EmployeeReport from "@/components/modules/incident/EmployeeReport";
import {
  IncidentForm,
  IncidentFormEmployee,
  IncidentFormFilter,
  IncidentFormPatient,
} from "@/models/incidentForm";
import PatientReport from "@/components/modules/incident/patientReport/PatientReport";
import { useState } from "react";

const DUMMY_PATIENT: IncidentFormPatient = {
  name: "Hakan Urtimur",
  bornDate: "04.01.1997",
  patientNum: "12345678901",
  date: "",
  incidentPlace: "",
  incidentDescription: "",
  file: undefined,
};

export function Page() {
  const [patient, setPatient] = useState<IncidentFormPatient | null>(null);
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
  return (
    <div className="w-full flex items-center justify-center">
      <Tabs defaultValue="general" className="w-1/2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="patient">Hasta</TabsTrigger>
          <TabsTrigger value="employee">Çalışan</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <IncidentReport onSubmit={handleIncidentReportSubmit} />
        </TabsContent>
        <TabsContent value="patient">
          <PatientReport
            onSubmitFilter={handleSubmitPatientFilter}
            onResetPatientForm={handleResetPatientForm}
            patientFormModel={patient}
            onPatientReportSubmit={handlePatientReportSubmit}
          />
        </TabsContent>
        <TabsContent value="employee">
          <EmployeeReport onSubmit={handleEmployeeReportSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
