"use client";
import React from "react";

import LoadingScreen from "@/components/commons/LoadingScreen";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import PageHeader from "@/components/ui/pageHeader";
import { columns } from "@/app/(app)/user/documents/requests/_components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/(app)/user/documents/requests/_components/data-table";

const Page = () => {
  // TODO: add query service

  // const query = useQuery({
  //   queryKey: ["documents"],
  //   queryFn: () => documentService.getDocuments(moduleId),
  // });

  const allRequestsQuery = {
    data: {
      data: [
        {
          requestNo: 101,
          state: true,
          qualityState: false,
          managerState: true,
          requestDate: "2024-01-15",
          requester: "Dr. Ayşe Yılmaz",
          department: "Oncology",
          documentType: "Patient Consent Form",
          requestType: "Initial",
          updateDate: "2024-01-20",
        },
        {
          requestNo: 102,
          state: false,
          qualityState: true,
          managerState: false,
          requestDate: "2024-02-10",
          requester: "Dr. Mehmet Kaya",
          department: "Cardiology",
          documentType: "Medical Report",
          requestType: "Follow-up",
          updateDate: "2024-02-15",
        },
        {
          requestNo: 103,
          state: true,
          qualityState: true,
          managerState: true,
          requestDate: "2024-03-05",
          requester: "Nurse Emine Demir",
          department: "Pediatrics",
          documentType: "Treatment Plan",
          requestType: "Update",
          updateDate: "2024-03-10",
        },
      ],
    },
  };
  const activeRequestsQuery = {
    data: {
      data: [
        {
          requestNo: 101,
          state: true,
          qualityState: false,
          managerState: true,
          requestDate: "2024-01-15",
          requester: "Dr. Ayşe Yılmaz",
          department: "Oncology",
          documentType: "Patient Consent Form",
          requestType: "Initial",
          updateDate: "2024-01-20",
        },
      ],
    },
  };

  const deparments = allRequestsQuery.data?.data.map((doc) => doc.department);

  const documentTypes = allRequestsQuery.data?.data.map(
    (doc) => doc.documentType,
  );
  const requestTypes = allRequestsQuery.data?.data.map(
    (doc) => doc.requestType,
  );

  const departmentOps = deparments
    ? convertStringArrayToOptions(deparments)
    : null;

  const documentTypeOpts = documentTypes
    ? convertStringArrayToOptions(documentTypes)
    : null;

  const requestTypeOpts = requestTypes
    ? convertStringArrayToOptions(requestTypes)
    : null;

  const activeDeparments = activeRequestsQuery.data?.data.map(
    (doc) => doc.department,
  );

  const activeDocumentTypes = activeRequestsQuery.data?.data.map(
    (doc) => doc.documentType,
  );
  const activeRequestTypes = activeRequestsQuery.data?.data.map(
    (doc) => doc.requestType,
  );

  const activeDepartmentOps = activeDeparments
    ? convertStringArrayToOptions(activeDeparments)
    : null;

  const activeDocumentTypeOpts = activeDocumentTypes
    ? convertStringArrayToOptions(activeDocumentTypes)
    : null;

  const activeRequestTypeOpts = activeRequestTypes
    ? convertStringArrayToOptions(activeRequestTypes)
    : null;

  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Dökümanlar"}
        description={"Dökümanlarınızı buradan yönetebilirsiniz."}
      />
      <Tabs defaultValue="all">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="all">Tüm Talepler</TabsTrigger>
            <TabsTrigger value="actives">Aktif Talepler</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={"all"}>
          {allRequestsQuery.data &&
          departmentOps &&
          documentTypeOpts &&
          requestTypeOpts ? (
            <DataTable
              departmentOps={departmentOps}
              documentTypeOpts={documentTypeOpts}
              requestTypeOpts={requestTypeOpts}
              columns={columns}
              data={allRequestsQuery.data.data}
            />
          ) : (
            <LoadingScreen />
          )}
        </TabsContent>
        <TabsContent value={"actives"}>
          {activeRequestsQuery.data &&
          activeDepartmentOps &&
          activeDocumentTypeOpts &&
          activeRequestTypeOpts ? (
            <DataTable
              departmentOps={activeDepartmentOps}
              documentTypeOpts={activeDocumentTypeOpts}
              requestTypeOpts={activeRequestTypeOpts}
              columns={columns}
              data={activeRequestsQuery.data.data}
            />
          ) : (
            <LoadingScreen />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
