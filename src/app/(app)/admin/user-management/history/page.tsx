"use client";

import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/pageHeader";
import actionHistory from "@/services/admin/ActionHistory";
import { DataTable } from "@/app/(app)/admin/user-management/history/_components/data-table";
import { columns } from "@/app/(app)/admin/user-management/history/_components/columns";

const Page = () => {
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: () => actionHistory.list(),
  });

  console.log(query.data);

  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Tarihçe"}
        description={"Buradan tarihçeyi görebilirsiniz."}
      />
      <div className="flex justify-between">
        <Button>Listele</Button>
      </div>
      {query.data && !query.isPending ? (
        <DataTable data={query.data.data} columns={columns} />
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Page;
