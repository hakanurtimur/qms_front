"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(app)/admin/user-management/history/_components/data-table";
import { columns } from "@/app/(app)/admin/user-management/history/_components/columns";
import { convertStringArrayToOptions } from "@/utils/getDocumentOptions";
import LoadingText from "@/components/ui/loading-text";
import { useAdminGetActionHistory } from "@/app/(app)/admin/user-management/history/lib/hooks/useAdminGetActionHistory";

const ActionHistoryContent = () => {
  const query = useAdminGetActionHistory();

  const queryNames = query.data?.data.map((item) => item.nameSurname);

  const nameOpts = queryNames ? convertStringArrayToOptions(queryNames) : null;

  const updateTables = query.data?.data.map((item) => item.updateTable);

  const updateTableOpts = updateTables
    ? convertStringArrayToOptions(updateTables)
    : null;

  return (
    <>
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
      ) : (
        <LoadingText />
      )}
    </>
  );
};

export default ActionHistoryContent;
