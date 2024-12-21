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

import {
  UpdateWaitingRequestModel,
  WaitingRequestModel,
} from "@/models/user/documents/waitingRequests/waitingRequestModel";
import OrganisationRequestSheet from "@/app/(app)/user/documents/organisation-requests/_components/organisation-request-sheet/organisation-request-sheet";

interface DataTableProps<TData, TValue> {
  departmentOps: { [key: string]: string };
  documentTypeOpts: { [key: string]: string };
  requestTypeOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "default" | "actives";
  superAdminActionOpts: { [key: number]: string };
  superAdminAboutOpts: { [key: number]: string };
  superAdminActionNameOpts: { [key: number]: string };
  handleGetGarbage: (fileId: string) => void;
  handleGetFile: (fileId: string) => void;
  documentTypeListQpts?: { [key: number]: string };
  handleUpdateWaitingRequest: (data: UpdateWaitingRequestModel) => void;
}

export function DataTable<TData, TValue>({
  departmentOps,
  /*   documentTypeOpts,
   */ requestTypeOpts,
  columns,
  data,
  variant = "default",
  superAdminActionOpts,
  superAdminAboutOpts,
  superAdminActionNameOpts,
  handleGetGarbage,
  handleGetFile,
  documentTypeListQpts,
  handleUpdateWaitingRequest,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("departmentName")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("departmentName")
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
                      .getColumn("superAdminActionName")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("superAdminActionName")
                      ?.setFilterValue(value ? value : "")
                  }
                  placeholder={"Kalite Durum"}
                  options={superAdminActionNameOpts}
                />
              </div>
              <div className="flex-1">
                <NonFormCombobox
                  value={
                    (table
                      .getColumn("requestTypeName")
                      ?.getFilterValue() as string) || ""
                  }
                  onChange={(value) =>
                    table
                      .getColumn("requestTypeName")
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
                          <OrganisationRequestSheet
                            id={(
                              row.original as WaitingRequestModel
                            ).id.toString()}
                            onSubmit={handleUpdateWaitingRequest}
                            variant={variant}
                            superAdminActionOpts={superAdminActionOpts}
                            superAdminAboutOpts={superAdminAboutOpts}
                            handleGetGarbage={handleGetGarbage}
                            handleGetFile={handleGetFile}
                            documentTypeListQpts={documentTypeListQpts}
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