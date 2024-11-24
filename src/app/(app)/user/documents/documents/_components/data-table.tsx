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
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NonFormCombobox from "@/components/ui/nonform-combobox";
import RevisionRequestSheet from "@/app/(app)/user/documents/documents/_components/revisionDocRequest/revision-request-sheet";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";

interface DataTableProps<TData, TValue> {
  categoryOpts: { [key: string]: string };
  folderOpts: { [key: string]: string };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onGetDocument: (fileId: string) => void;
  onPrintibleDocument: (fileId: string) => void;
  getDocumentLoading: boolean;
}

export function DataTable<TData, TValue>({
  categoryOpts,
  folderOpts,
  columns,
  data,
  onGetDocument,
  onPrintibleDocument,
  getDocumentLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    {
      id: "categoryName",
      value: "",
    },
    {
      id: "folderName",
      value: "",
    },
    {
      id: "fileName",
      value: "",
    },
  ]);
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
    },
  });

  return (
    <TooltipProvider>
      <div className="w-full overflow-scroll flex items-center justify-center no-scrollbar">
        <div className="rounded-md border no-scrollbar">
          <div className="flex items-center py-4 px-4 gap-10">
            <div className="flex flex-1 flex-shrink-0 items-center gap-10">
              <div className="flex flex-1 col-span-1 items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <InformationCircleIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side={"bottom"} className="ml-52">
                    <p className="max-w-[200px] ">
                      Bu bölümde hastanemizde kullanılan rıza belgeleri ve
                      kalite dokümanları bulunmaktadır. Rıza belgeleri, hasta
                      onaylarını ve bilgilerini kaydederken, kalite dokümanları
                      hizmet standartlarını belirleyerek sürekli iyileştirmeyi
                      destekler.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1">
                  <NonFormCombobox
                    value={
                      (table
                        .getColumn("categoryName")
                        ?.getFilterValue() as string) || ""
                    }
                    onChange={(value) =>
                      table
                        .getColumn("categoryName")
                        ?.setFilterValue(value ? value : "")
                    }
                    placeholder={"Kategoriler"}
                    options={categoryOpts}
                  />
                </div>
              </div>
              <div className="flex flex-1 col-span-1 items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <InformationCircleIcon className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side={"bottom"} className="ml-52">
                    <p className="max-w-[200px]">
                      Bu klasörde, hastanemizdeki tıbbi hizmetleri yürüten tüm
                      bölümler ve ilgili rıza belgeleri bulunmaktadır. Her
                      bölüm, uzmanlık alanına göre ayrılmış olup, tedavi
                      süreçlerinde gereken belgeleri içerir.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1">
                  <NonFormCombobox
                    value={
                      (table
                        .getColumn("folderName")
                        ?.getFilterValue() as string) || ""
                    }
                    onChange={(value) =>
                      table
                        .getColumn("folderName")
                        ?.setFilterValue(
                          value ? value.toLocaleUpperCase("tr") : "",
                        )
                    }
                    placeholder={"Klasör Adı"}
                    options={folderOpts}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 max-w-[520px] flex-shrink-0 col-span-1 justify-stretch gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <InformationCircleIcon className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent side={"bottom"} className="ml-52">
                  <p className="max-w-[200px]">
                    Bu bölüm, tüm dokümanların isim ve kodlarını içermekte olup,
                    kullanıcıların aradıkları belgelere kolayca ulaşmalarını
                    sağlar.
                  </p>
                </TooltipContent>
              </Tooltip>
              <Input
                name="fileName"
                placeholder="Dosya Adı"
                value={
                  (table.getColumn("fileName")?.getFilterValue() as string) ||
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("fileName")
                    ?.setFilterValue(event.target.value.toLocaleUpperCase("tr"))
                }
              />
            </div>
          </div>
          <div className="rounded-md border px-4 py-4">
            <Table className="table-fixed">
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
                    <TableHead className="w-40">İşlem</TableHead>
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
                          {(row.original as RequestDocumentListModel)
                            .printing === 1 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  disabled={getDocumentLoading}
                                  onClick={() => {
                                    // const selected =
                                    //   row.original as RequestDocumentListModel;
                                    // mutation.mutate(selected.fileId.toString());
                                    // handleGetDocument(
                                    //   selected.fileId.toString(),
                                    // );
                                    onPrintibleDocument("1636");
                                  }}
                                  size="icon"
                                >
                                  <PrinterIcon className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Yazdır</TooltipContent>
                            </Tooltip>
                          )}
                          {(row.original as RequestDocumentListModel)
                            .reading === 1 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => {
                                    // const selected =
                                    //   row.original as RequestDocumentListModel;
                                    // mutation.mutate(selected.fileId.toString());
                                    // handleGetDocument(
                                    //   selected.fileId.toString(),
                                    // );
                                    onGetDocument("1636");
                                  }}
                                  size="icon"
                                  disabled={getDocumentLoading}
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Görüntüle</TooltipContent>
                            </Tooltip>
                          )}
                          {(row.original as RequestDocumentListModel)
                            .changeRequest === 1 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <RevisionRequestSheet
                                  onSubmit={(
                                    data: RequestDocumentListModel,
                                  ) => {
                                    console.log(data);
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Revizyon Talebi</TooltipContent>
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
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
