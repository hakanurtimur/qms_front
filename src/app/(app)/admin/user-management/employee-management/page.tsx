"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import employeeManagementService from "@/services/admin/EmployeeManagement";
import { DataTable } from "@/app/(app)/admin/user-management/employee-management/_components/data-table";
import React from "react";
import { Columns } from "@/app/(app)/admin/user-management/employee-management/_components/columns";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import GuestSheet from "@/app/(app)/admin/user-management/employee-management/_components/guest/guest-sheet";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";

const Page = () => {
  const { user } = useAuth();

  const employeeQuery = useQuery({
    queryKey: ["employee-management"],
    queryFn: () => employeeManagementService.listEmployees(),
  });

  const managerQuery = useQuery({
    queryKey: ["manager-management"],
    queryFn: () => employeeManagementService.listManagers(),
  });

  const roleQuery = useQuery({
    queryKey: ["roles"],
    queryFn: () => employeeManagementService.getEmployeeRoles(),
  });

  const departmentQuery = useQuery({
    queryKey: ["departments"],
    queryFn: () => employeeManagementService.getDepartments(),
  });

  const employeeMutation = useMutation({
    mutationKey: ["update-employee"],
    mutationFn: (args: {
      id: string;
      data: {
        id: number;
        roleId: number;
      };
    }) => employeeManagementService.updateEmployee(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Personel başarıyla güncellendi",
        variant: "success",
      });
      console.log(data);
      employeeQuery.refetch().then();
      managerQuery.refetch().then();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Personel güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const managerMutation = useMutation({
    mutationKey: ["update-manager"],
    mutationFn: (args: {
      id: string;
      data: {
        id: number;
        roleId: number;
        departmentId: number;
        state: boolean;
      };
    }) => employeeManagementService.updateManager(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Yönetici başarıyla güncellendi",
        variant: "success",
      });
      console.log(data);
      employeeQuery.refetch().then();
      managerQuery.refetch().then();
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Hata",
        description: "Yönetici güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const managerDepartmentMutation = useMutation({
    mutationKey: ["update-manager-department"],
    mutationFn: (args: {
      id: string;
      data: {
        id: number;
        departmentId: number;
      };
    }) => employeeManagementService.addDepartmentToManager(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Yönetici başarıyla güncellendi",
        variant: "success",
      });
      console.log(data);
      managerQuery.refetch().then();
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Hata",
        description: "Yönetici güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const addGuestMutation = useMutation({
    mutationKey: ["addGuest"],
    mutationFn: (args: { userId: string; data: GuestCreated }) =>
      employeeManagementService.addGuest(args),
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: "Misafir kullanıcı eklendi",
        variant: "success",
      });
      console.log(data);
      employeeQuery.refetch().then();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Misafir kullanıcı eklenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const handleUpdateEmployee = (formData: EmployeeToManageTableModel) => {
    if (!user) return;
    const data: {
      id: number;
      roleId: number;
    } = {
      id: formData.id,
      roleId: formData.roleId,
    };
    employeeMutation.mutate({
      id: user.userId,
      data,
    });
  };

  const handleUpdateManager = (formData: EmployeeToManageTableModel) => {
    if (!user) return;
    const data: {
      id: number;
      roleId: number;
      departmentId: number;
      state: boolean;
    } = {
      id: formData.id,
      roleId: formData.roleId,
      departmentId: formData.departmentId,
      state: formData.workingStatus,
    };
    managerMutation.mutate({
      id: user.userId,
      data,
    });
  };

  const handleAddDepartmentToManager = (
    formData: EmployeeToManageTableModel,
  ) => {
    if (!user) return;
    const data: {
      id: number;
      departmentId: number;
    } = {
      id: formData.id,
      departmentId: formData.departmentId,
    };
    managerDepartmentMutation.mutate({
      id: user.userId,
      data,
    });
  };

  const handleGuestSubmit = (data: GuestCreated) => {
    if (!user) return;
    addGuestMutation.mutate({
      userId: user.userId,
      data,
    });
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <Tabs defaultValue="employee">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="employee">Personel</TabsTrigger>
            <TabsTrigger value="manager">Yönetici</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="employee">
          {employeeQuery.data &&
          roleQuery.data &&
          !employeeQuery.isPending &&
          !roleQuery.isPending ? (
            <>
              <div className="flex w-full justify-end my-2">
                <GuestSheet onSubmit={handleGuestSubmit} />
              </div>
              <DataTable
                data={employeeQuery.data.data}
                columns={Columns}
                onSheetFormSubmit={handleUpdateEmployee}
                roles={roleQuery.data.data}
                departments={undefined}
                variant={"employee"}
              />
            </>
          ) : null}
        </TabsContent>
        <TabsContent value="manager" className="pt-11">
          {managerQuery.data &&
          roleQuery.data &&
          departmentQuery.data &&
          !managerQuery.isPending &&
          !departmentQuery.isPending &&
          !roleQuery.isPending ? (
            <DataTable
              data={managerQuery.data.data}
              columns={Columns}
              onSheetFormSubmit={handleUpdateManager}
              onAddDepartment={handleAddDepartmentToManager}
              roles={roleQuery.data.data}
              departments={departmentQuery.data.data}
              variant={"manager"}
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
