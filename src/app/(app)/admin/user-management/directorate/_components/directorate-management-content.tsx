"use client";

import { Button } from "@/components/ui/button";
import { columns, Directorate } from "./directorate/directorate-columns";
import { DataTable } from "./directorate/directorate-data-table";

const dummyData: Directorate[] = [
  {
    id: "1",
    departmentName: "IT",
    email: "example@mail.com",
  },
  {
    id: "2",
    departmentName: "Frontend Developer",
    email: "example@mail.com",
  },
  {
    id: "3",
    departmentName: "Backend Developer",
    email: "example@mail.com",
  },
];

const DirectorateManagementContent = () => {
  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Listele
        </Button>
      </div>
      <div className="mt-4">
        <DataTable data={dummyData} columns={columns} />
      </div>
    </>
  );
};

export default DirectorateManagementContent;
