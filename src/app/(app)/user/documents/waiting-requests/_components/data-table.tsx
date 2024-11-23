"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { TooltipProvider } from "@/components/ui/tooltip";
import NonFormCombobox from "@/components/ui/nonform-combobox";
import WaitingRequestSheet from "@/app/(app)/user/documents/waiting-requests/_components/waiting-request-sheet/waiting-request-sheet";
import { WaitingRequestModelUpdate } from "@/models/user/waitingRequests/waitingRequestModel";

interface DataTableProps<TData, TValue> {
  departmentOps: { [key: string]: string };
  documentTypeOpts: { [key: string]: string };
  requestTypeOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "default" | "actives";
}

export function DataTable<TData, TValue>({
  departmentOps,
  documentTypeOpts,
  requestTypeOpts,
  columns,
  data,
  variant = "default",
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // TODO: add related mutation

  // const mutation = useMutation({
  //   mutationKey: ["goDoc"],
  //   mutationFn: (fileId: string) => documentService.goDoc(fileId),
  //   onSuccess: (data) => {
  //     console.log(data);
  //     console.log(data.data.url);
  //     if (data.data.url) {
  //       window.open(data.data.url, "_blank");
  //     }
  //   },
  // });

  // const queryData: UserRequestModelUpdate = {
  //   RequestNumber: 123,
  //   ActionId: 102,
  //   ManagerActionName: "Approve Request",
  //   AdministratorActionName: "Verify Document",
  //   OpenDate: "2024-11-16T12:00:00Z",
  //   UserName: "john_doe",
  //   DepartmentName: "Finance",
  //   DocumentTypeId: 3,
  //   RequestTypeName: "Expense Approval",
  //   DescriptionUser: "Requesting approval for Q4 budget.",
  //   DescriptionManager: "Reviewed and approved for further processing.",
  //   AdminName: "admin_jane",
  //   SuperAdminName: "superadmin_mark",
  //   AdminAboutName: "Jane's Admin Actions",
  //   DescriptionAdmin: "All documents verified.",
  //   AdministratorName: "jane_admin",
  //   UpdateDate: "2024-11-16T15:30:00Z",
  //   FileId: 456,
  //   FieName: "budget_q4.pdf",
  //   GarbageId: 789,
  //   AuthRequestId: 321,
  // };

  // const mutationFn = (data: UserRequestModelUpdate) => {
  //   console.log(data);
  // };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const queryData: WaitingRequestModelUpdate = {
    Id: 1,
    ActionId: 1001,
    ActionName: "Create",
    AdminAboutId: 2001,
    AdminAboutName: "User Management",
    AdministratorActionId: 3001,
    AdministratorActionName: "Approve",
    AdministratorName: "John Doe",
    AdminName: "Jane Smith",
    AuthRequestId: 4001,
    DepartmentName: "IT Department",
    DescriptionAdmin: "Admin approved the request.",
    DescriptionManager: "Manager reviewed the document.",
    DescriptionUser: "User submitted the request.",
    DocumentTypeId: 5001,
    DocumentTypeName: "PDF",
    FileId: 6001,
    FieName: "user_manual.pdf",
    FileUploadState: 1,
    GarbageId: 7001,
    Mail: "user@example.com",
    ManagerActionId: 8001,
    ManagerActionName: "Review",
    OpenDate: "2024-11-22T10:00:00Z",
    PhoneNumber: "+1-555-123-4567",
    RequestTypeId: 9001,
    RequestTypeName: "Account Creation",
    SuperAdminName: "Michael Johnson",
    UpdateDate: "2024-11-23T12:00:00Z",
    UserName: "alex123",
  };

  const mutationFn = (data: WaitingRequestModelUpdate) => {
    console.log(data);
  };

  return (
    <TooltipProvider>
      <div className="min-w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="min-w-full rounded-md border no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10">
            <div className="flex flex-1 flex-shrink-0 items-center gap-10">
              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("department")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("department")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Bölüm Adı"}
                  options={departmentOps}
                />
              </div>

              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("documentType")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("documentType")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Doküman Tipi"}
                  options={documentTypeOpts}
                />
              </div>
              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("requestType")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("requestType")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Talep Tipi"}
                  options={requestTypeOpts}
                />
              </div>
            </div>
            <div className="flex flex-1 max-w-[420px] flex-shrink-0 col-span-1 justify-stretch gap-2">
              <Input
                placeholder="Arama yapın..."
                value={globalFilter ?? ""}
                onChange={(event) =>
                  setGlobalFilter(event.target.value.toLocaleUpperCase("tr"))
                }
                className="max-w-sm"
              />
            </div>
          </div>
          <div className="rounded-md border px-4 py-4">
            <Table className="">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead key={header.id + index}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                    <TableHead className="w-20">İşlem</TableHead>
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id + index}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell key={cell.id + index}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <WaitingRequestSheet
                            model={queryData}
                            onSubmit={mutationFn}
                            variant={variant}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sonuç yok.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div>
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
