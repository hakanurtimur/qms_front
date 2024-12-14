"use client";

import { DataTable } from "@/app/(app)/admin/user-management/location/_components/data-table";
import { columns } from "@/app/(app)/admin/user-management/location/_components/columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAdminGetLocations } from "@/app/(app)/admin/user-management/location/lib/hooks/useAdminGetLocations";
import LoadingText from "@/components/ui/loading-text";

const LocationContent = () => {
  const query = useAdminGetLocations();

  return (
    <>
      <div className="flex justify-between">
        <Button>Listele</Button>
        <Button size={"icon"}>
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      {query.data && !query.isPending ? (
        <DataTable data={query.data.data} columns={columns} />
      ) : (
        <LoadingText />
      )}
    </>
  );
};

export default LocationContent;
