"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
/* import {
  ChartConfig,
     ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent, 
} from "@/components/ui/chart"; */
/* import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label as ChartLabel,
  Pie,
  PieChart,
  XAxis,
} from "recharts"; */
import * as React from "react";
import UploadProfileModal from "../../../app/(app)/admin/profile/_components/upload-profile-modal";
import { UploadIcon, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import RemoveProfileModal from "@/app/(app)/admin/profile/_components/remove-profile-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import profileService from "@/services/user/profile/ProfileService";
import { useAuth } from "@/context/authContext";
import Image from "next/image";

const ProfileDashboard = () => {
  // queries and mutations will be added here
  const [openProfileUploadModal, setOpenProfileUploadModal] =
    React.useState(false);

  const [openProfileRemoveModal, setOpenProfileRemoveModal] =
    React.useState(false);
  const auth = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(Number(auth.user?.userId)),
    enabled: !!auth.user?.userId,
  });

  const deleteProfileImgMutation = useMutation({
    mutationKey: ["delete-profile-img"],
    mutationFn: () =>
      profileService.deleteProfileImg(Number(auth.user?.userId)),
    onSuccess: () => {
      refetch();
    },
  });

  const uploadProfileImgMutation = useMutation({
    mutationKey: ["upload-profile-img"],
    mutationFn: (file: File) =>
      profileService.changeProfileImg(Number(auth.user?.userId), file),
    onSuccess: () => {
      refetch();
    },
  });

  /*  React.useEffect(() => {
    if (isSuccess && data?.data?.pathProfileImg) {
      console.log("Url:" + data.data?.pathProfileImg);
    }
  }, [isSuccess, data]); */

  const dummyData = {
    registeryNo: data?.data?.registeryNo,
    nameSurname: data?.data?.nameSurname,
    username: data?.data?.username,
    email: data?.data?.mail,
    phoneNum: data?.data?.phoneNumber,
    location: data?.data?.locationName,
    department: data?.data?.departmentName,
    job: data?.data?.jobName,
    title: data?.data?.titleName,
    systemRole: data?.data?.roleName,
  };

  /*   const chartData2 = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];
 */
  /*   const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
 */
  /* const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const chartConfig2 = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
 */
  /*   const totalVisitors = React.useMemo(() => {
    return chartData2.reduce((acc, curr) => acc + curr.visitors, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  const handleRemoveProfileImg = () => {
    deleteProfileImgMutation.mutate();
  };

  const handleUploadProfileImg = (file: File) => {
    uploadProfileImgMutation.mutate(file);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="py-1">Kişisel Bilgiler</CardTitle>
            <div className="w-92  pt-1  rounded text-gray-900 bg-black-200" />
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4">
            <FormItem>
              <Label>Sicil No</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    value={dummyData.registeryNo}
                    className="truncate max-w-[190px]"
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dummyData.registeryNo}</p>
                </TooltipContent>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Label>Adı Soyadı</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    value={dummyData.nameSurname}
                    className="truncate max-w-[280px]"
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dummyData.nameSurname}</p>
                </TooltipContent>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Label className="ml-8">Sistem Rolü</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    value={dummyData.systemRole}
                    className="truncate ml-8 max-w-[150px]"
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dummyData.systemRole}</p>
                </TooltipContent>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Label>Kullanıcı Adı</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    value={dummyData.username}
                    className="truncate max-w-[190px]"
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dummyData.username}</p>
                </TooltipContent>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Label>Mail</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    value={dummyData.email}
                    className="truncate max-w-[280px]"
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dummyData.email}</p>
                </TooltipContent>
              </Tooltip>
            </FormItem>

            <FormItem>
              <Label className="ml-8">Telefon</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    value={dummyData.phoneNum}
                    className="truncate ml-8 max-w-[150px]"
                    readOnly
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dummyData.phoneNum}</p>
                </TooltipContent>
              </Tooltip>
            </FormItem>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="py-1">Şirket Bilgileri</CardTitle>
            <div className="w-92  pt-1  rounded text-gray-900 bg-black-200" />
          </CardHeader>

          <CardContent className="w-full h-full flex flex-row justify-between ">
            <div className="flex flex-col gap-4 w-3/4">
              <div className="flex flex-row gap-4 min-w-full">
                <FormItem className="w-full">
                  <Label>Şube Adı</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        value={dummyData.location}
                        className="truncate max-w-[230px]"
                        readOnly
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dummyData.location}</p>
                    </TooltipContent>
                  </Tooltip>
                </FormItem>
                <FormItem className="w-full">
                  <Label>Bölüm</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        value={dummyData.department}
                        className="truncate max-w-[230px]"
                        readOnly
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dummyData.department}</p>
                    </TooltipContent>
                  </Tooltip>
                </FormItem>
              </div>
              <div className="flex flex-row gap-4">
                <FormItem className="w-full">
                  <Label>Görev</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        value={dummyData.job}
                        className="truncate max-w-[230px]"
                        readOnly
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dummyData.job}</p>
                    </TooltipContent>
                  </Tooltip>
                </FormItem>
                <FormItem className="w-full">
                  <Label>Ünvan</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        value={dummyData.title}
                        className="truncate max-w-[230px]"
                        readOnly
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dummyData.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </FormItem>
              </div>
            </div>
            <div className="relative border bg-black w-36 h-36 mt-3 ml-6 rounded-lg flex">
              <Image
                src={
                  data?.data?.profileImg == null
                    ? "/icons/profile.jpg"
                    : data?.data?.pathProfileImg
                }
                alt="profile"
                className="absolute w-full h-full object-cover rounded-lg transition-opacity duration-300 inset-0 flex items-center border justify-center opacity-100 hover:opacity-20 hover:backdrop-blur-sm bg-black bg-opacity-50 hover:backdrop-blur-2x"
                width={144}
                height={144}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg hover:backdrop-blur-sm">
                <div className="flex flex-row gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <UploadIcon
                          onClick={() =>
                            setOpenProfileUploadModal(!openProfileUploadModal)
                          }
                          className="w-8 h-8 p-1 bg-gray-50 border rounded cursor-pointer hover:bg-gray-100"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Yükle</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <X
                          onClick={() =>
                            setOpenProfileRemoveModal(!openProfileRemoveModal)
                          }
                          className="w-8 h-8 p-1 bg-gray-50 border rounded cursor-pointer hover:bg-gray-100"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Kaldır</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
        {/*  <Card>
          <CardHeader>
            <CardTitle>Kullanıcı İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card> */}
        {/*  <Card>
          <CardHeader>
            <CardTitle>Kullanıcı İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig2}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData2}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <ChartLabel
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card> */}
      </div>
      <UploadProfileModal
        open={openProfileUploadModal}
        setOpen={() => setOpenProfileUploadModal(!openProfileUploadModal)}
        onUpload={handleUploadProfileImg}
      />
      <RemoveProfileModal
        open={openProfileRemoveModal}
        setOpen={() => setOpenProfileRemoveModal(!openProfileRemoveModal)}
        onRemove={handleRemoveProfileImg}
      />
    </div>
  );
};

export default ProfileDashboard;
