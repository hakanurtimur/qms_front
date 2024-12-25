"use client";

import { DataTable } from "@/app/(app)/admin/user-management/role-management/_components/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "@/app/(app)/admin/user-management/role-management/_components/columns";
import CreateRoleSheet from "@/app/(app)/admin/user-management/role-management/_components/create-role/create-role-sheet";
import { useAdminGetRolesList } from "@/app/(app)/admin/user-management/role-management/lib/hooks/useAdminGetRolesList";
import LoadingText from "@/components/ui/loading-text";

const RoleManagementContent = () => {
  const query = useAdminGetRolesList();

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
        <CreateRoleSheet />
      </div>
      {query.data && !query.isPending ? (
        <DataTable data={query.data.data} columns={columns} />
      ) : (
        <LoadingText />
      )}
    </>
  );
};

export default RoleManagementContent;
