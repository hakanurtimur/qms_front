"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/ui/pageHeader";

import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import employeeManagementService from "@/services/admin/EmployeeManagement";
import { EmployeeDataTable } from "@/app/(app)/admin/user-management/employee-management/_components/employee/employee-data-table";
import React from "react";
import { EmployeeColumns } from "@/app/(app)/admin/user-management/employee-management/_components/employee/employee-columns";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { EmployeeToManageTableModel } from "@/models/admin/employeeManagement/employeeToManageTableModel";
import GuestSheet from "@/app/(app)/admin/user-management/employee-management/_components/guest/guest-sheet";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";

const Page = () => {
  const { user } = useAuth();

  const employeeQuery = useQuery({
    queryKey: ["employee-management"],
    queryFn: () => employeeManagementService.listEmployees(),
  });

  const roleQuery = useQuery({
    queryKey: ["roles"],
    queryFn: () => employeeManagementService.getEmployeeRoles(),
  });

  const employeeMutation = useMutation({
    mutationKey: ["updateManagerLocation"],
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
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Personel güncellenirken bir hata oluştu",
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
        description: "Misafir kullanıcı başarıyla eklendi",
        variant: "success",
      });
      console.log(data);
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

  const handleGuestSubmit = (data: GuestCreated) => {
    if (!user) return;
    addGuestMutation.mutate({
      userId: user.userId,
      data,
    });
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Personel İşlemleri"}
        description={"Buradan personel işlemlerini yönetebilirsiniz."}
      />
      <Tabs defaultValue="employee">
        <div className="w-full flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-[480px]">
            <TabsTrigger value="employee">Personel</TabsTrigger>
            <TabsTrigger value="manager">Yönetici</TabsTrigger>
          </TabsList>
          <GuestSheet onSubmit={handleGuestSubmit} />
        </div>
        <TabsContent value="employee">
          {employeeQuery.data &&
          roleQuery.data &&
          !employeeQuery.isPending &&
          !roleQuery.isPending ? (
            <EmployeeDataTable
              data={employeeQuery.data.data}
              columns={EmployeeColumns}
              onSheetFormSubmit={handleUpdateEmployee}
              roles={roleQuery.data.data}
            />
          ) : (
            <div className="w-screen h-screen absolute top-0 left-0">
              <LoadingScreen />
            </div>
          )}
        </TabsContent>
        {/*<TabsContent value="manager">*/}
        {/*  <Card>*/}
        {/*    <CardHeader>*/}
        {/*      <CardTitle>Password</CardTitle>*/}
        {/*      <CardDescription>*/}
        {/*        Change your password here. After saving, you'll be logged out.*/}
        {/*      </CardDescription>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent className="space-y-2">*/}
        {/*      <div className="space-y-1">*/}
        {/*        <Label htmlFor="current">Current password</Label>*/}
        {/*        <Input id="current" type="password" />*/}
        {/*      </div>*/}
        {/*      <div className="space-y-1">*/}
        {/*        <Label htmlFor="new">New password</Label>*/}
        {/*        <Input id="new" type="password" />*/}
        {/*      </div>*/}
        {/*    </CardContent>*/}
        {/*    <CardFooter>*/}
        {/*      <Button>Save password</Button>*/}
        {/*    </CardFooter>*/}
        {/*  </Card>*/}
        {/*</TabsContent>*/}
      </Tabs>
    </div>
  );
};

export default Page;
