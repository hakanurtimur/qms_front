"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label as ChartLabel,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import * as React from "react";

const ProfileDashboard = () => {
  // queries and mutations will be added here

  const dummyData = {
    sicilNo: "123456",
    name: "John",
    surname: "Doe",
    username: "johndoe",
    email: "john@doe.com",
    phoneNum: "1234567890",
    location: "Company",
    department: "IT",
    job: "Developer",
    title: "Software Developer",
    systemRole: "Admin",
  };

  const chartData2 = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
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

  const totalVisitors = React.useMemo(() => {
    return chartData2.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Kişisel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <FormItem>
              <Label>Sicil No</Label>
              <Input value={dummyData.sicilNo} readOnly />
            </FormItem>
            <FormItem>
              <Label>Ad-Soyad</Label>
              <Input
                value={dummyData.name + " " + dummyData.surname}
                readOnly
              />
            </FormItem>
            <div></div>
            <FormItem>
              <Label>Kullanıcı Adı</Label>
              <Input value={dummyData.username} readOnly />
            </FormItem>
            <FormItem>
              <Label>Mail</Label>
              <Input value={dummyData.email} readOnly />
            </FormItem>
            <FormItem>
              <Label>Telefon</Label>
              <Input value={dummyData.phoneNum} readOnly />
            </FormItem>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Şirket Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <FormItem>
              <Label>Lokasyon</Label>
              <Input value={dummyData.location} readOnly />
            </FormItem>
            <FormItem>
              <Label>Departman</Label>
              <Input value={dummyData.department} readOnly />
            </FormItem>
            <div></div>
            <FormItem>
              <Label>Görev</Label>
              <Input value={dummyData.job} readOnly />
            </FormItem>
            <FormItem>
              <Label>Ünvan</Label>
              <Input value={dummyData.title} readOnly />
            </FormItem>
            <FormItem>
              <Label>Sistem Rolü</Label>
              <Input value={dummyData.systemRole} readOnly />
            </FormItem>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
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
        </Card>
      </div>
    </div>
  );
};

export default ProfileDashboard;
