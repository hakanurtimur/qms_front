"use client";

import managerLocationService from "@/services/admin/Location";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataTable } from "@/app/(app)/admin/user-management/location/_components/data-table";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { columns } from "@/app/(app)/admin/user-management/location/_components/columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/components/ui/pageHeader";
import { ManagerLocationModel } from "@/models/admin/location";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";

const Page = () => {
  const { user } = useAuth();
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: () => managerLocationService.list(),
  });

  const mutation = useMutation({
    mutationKey: ["updateManagerLocation"],
    mutationFn: (args: { userId: string; data: ManagerLocationModel }) =>
      managerLocationService.update(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Lokasyon başarıyla güncellendi",
        variant: "success",
      });
      console.log(data);
      query.refetch().then();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Lokasyon güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const handleSheetFormSubmit = (data: ManagerLocationModel) => {
    if (!user) return;
    mutation.mutate({ userId: user.userId, data });
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Lokasyon"}
        description={"Buradan lokasyonları yönetebilirsiniz."}
      />
      <div className="flex justify-between">
        <Button>Listele</Button>
        <Button size={"icon"}>
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      {query.data && !query.isPending ? (
        <DataTable
          data={query.data.data}
          columns={columns}
          onSheetFormSubmit={handleSheetFormSubmit}
        />
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Page;
