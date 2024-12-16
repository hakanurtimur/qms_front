import React from "react";
import PatientFeedbackContext from "./_components/patient-feedback-context";
import PageBody from "@/components/page-body";

const Page = () => {
  //TODO: query data

  return (
    <PageBody>
      <PatientFeedbackContext />
    </PageBody>
  );
};

export default Page;
