"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import actionHistory from "@/services/admin/ActionHistory";
import { DataTable } from "@/app/(app)/admin/user-management/history/_components/data-table";
import { columns } from "@/app/(app)/admin/user-management/history/_components/columns";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";

const Page = () => {
  const query = useQuery({
    queryKey: ["actionHistory"],
    queryFn: () => actionHistory.list(),
  });

  const queryNames = query.data?.data.map((item) => item.nameSurname);

  const nameOpts = queryNames ? convertStringArrayToOptions(queryNames) : null;

  const updateTables = query.data?.data.map((item) => item.updateTable);

  const updateTableOpts = updateTables
    ? convertStringArrayToOptions(updateTables)
    : null;

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex justify-between">
        <Button>Listele</Button>
      </div>
      {query.data && nameOpts && updateTableOpts && !query.isPending ? (
        <DataTable
          nameOpts={nameOpts}
          updateTableOpts={updateTableOpts}
          data={query.data.data}
          columns={columns}
        />
      ) : null}
    </div>
  );
};

export default Page;
