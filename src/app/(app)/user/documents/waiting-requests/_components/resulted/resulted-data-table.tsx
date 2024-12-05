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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";

interface DataTableProps<TData, TValue> {
  // requestTypeOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleDocumentUploadModal: (id: string) => void;
  handleDocumentReviseModal: () => void;
}

export function ResultedDataTable<TData, TValue>({
  columns,
  data,
  handleDocumentUploadModal,
  handleDocumentReviseModal,
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
  //   SuperAdminActionName: "Approve Request",
  //   AdministratorActionName: "Verify Document",
  //   OpenDate: "2024-11-16T12:00:00Z",
  //   UserName: "john_doe",
  //   DepartmentName: "Finance",
  //   DocumentTypeId: 3,
  //   RequestTypeName: "Expense Approval",
  //   DescriptionUser: "Requesting approval for Q4 budget.",
  //   DescriptionAdmin: "Reviewed and approved for further processing.",
  //   AdminName: "admin_jane",
  //   SuperAdminName: "superadmin_mark",
  //   SuperAdminAboutName: "Jane's Admin Actions",
  //   DescriptionSuperAdmin: "All documents verified.",
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

  return (
    <TooltipProvider>
      <div className="min-w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="min-w-full rounded-md border no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10">
            <div className="flex flex-1 flex-shrink-0 items-center gap-10">
              <div className="flex-1 max-w-sm">
                {/*<NonFormCombobox*/}
                {/*  value={*/}
                {/*    (table*/}
                {/*      .getColumn("requestType")*/}
                {/*      ?.getFilterValue() as string) || ""*/}
                {/*  }*/}
                {/*  onChange={(value) =>*/}
                {/*    table*/}
                {/*      .getColumn("requestType")*/}
                {/*      ?.setFilterValue(value ? value : "")*/}
                {/*  }*/}
                {/*  placeholder={"Talep Tipi"}*/}
                {/*  options={requestTypeOpts}*/}
                {/*/>*/}
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
                          {row.getValue("requestTypeId") === 1 && (
                            <Tooltip>
                              <TooltipTrigger
                                asChild
                                onClick={() => {
                                  handleDocumentUploadModal(
                                    row.getValue("id").toString(),
                                  );
                                }}
                              >
                                {/*<RequestSheet*/}
                                {/*  model={queryData}*/}
                                {/*  onSubmit={mutationFn}*/}
                                {/*/>*/}
                                <Button size={"icon"}>
                                  <PlusIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Yeni Doküman Ekle</TooltipContent>
                            </Tooltip>
                          )}
                          {row.getValue("requestTypeId") === 2 && (
                            <Tooltip>
                              <TooltipTrigger
                                asChild
                                onClick={() => {
                                  handleDocumentReviseModal(
                                    row.getValue("id").toString(),
                                  );
                                }}
                              >
                                {/*<RequestSheet*/}
                                {/*  model={queryData}*/}
                                {/*  onSubmit={mutationFn}*/}
                                {/*/>*/}
                                <Button size={"icon"}>
                                  <ArrowPathIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Revize Et</TooltipContent>
                            </Tooltip>
                          )}
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
            <DataTablePagination
              isColumnHiderDropdownVisible={true}
              table={table}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
