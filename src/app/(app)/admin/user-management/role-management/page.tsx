"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { DataTable } from "@/app/(app)/admin/user-management/role-management/_components/data-table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { columns } from "@/app/(app)/admin/user-management/role-management/_components/columns";
import roleManagementService from "@/services/admin/RoleManagement";
import { RoleManagementRoleModel } from "@/models/admin/roleManagementRoleModel";
import CreateRoleSheet from "@/app/(app)/admin/user-management/role-management/_components/create-role/create-role-sheet";

const Page = () => {
  const { user } = useAuth();
  const query = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleManagementService.list(),
  });

  const updateMutation = useMutation({
    mutationKey: ["role-update"],
    mutationFn: (args: {
      userId: string;
      data: {
        roleName: string;
        roleId: number;
        state: boolean;
      };
    }) => roleManagementService.update(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Rol başarıyla güncellendi",
        variant: "success",
      });
      console.log(data);
      query.refetch().then();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Rol güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const addMutation = useMutation({
    mutationKey: ["role-add"],
    mutationFn: (args: {
      userId: string;
      data: {
        roleName: string;
      };
    }) => roleManagementService.add(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Rol başarıyla güncellendi",
        variant: "success",
      });
      console.log(data);
      query.refetch().then();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Rol güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const handleSheetFormSubmit = (formData: RoleManagementRoleModel) => {
    if (!user) return;
    const data = {
      roleName: formData.roleName,
      roleId: formData.roleId,
      state: formData.state,
    };
    updateMutation.mutate({ userId: user.userId, data });
  };

  const handleSheetFormSubmitAdd = (formData: RoleManagementRoleModel) => {
    if (!user) return;
    const data = {
      roleName: formData.roleName,
    };
    addMutation.mutate({ userId: user.userId, data });
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <div className={"w-full flex flex-col space-y-10"}>
        <div className="flex justify-between">
          <Button>Listele</Button>
          <CreateRoleSheet onSubmit={handleSheetFormSubmitAdd} />
        </div>
        {query.data && !query.isPending ? (
          <DataTable
            data={query.data.data}
            columns={columns}
            onSheetFormSubmit={handleSheetFormSubmit}
          />
        ) : (
          <div className="w-screen h-screen absolute top-0 left-0">
            <LoadingScreen />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
