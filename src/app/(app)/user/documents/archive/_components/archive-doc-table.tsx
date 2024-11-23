"use client";

import React, { useState } from "react";
import {
  ColumnDef,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

interface ArchiveDoc {
  id: number;
  category: string;
  folder: string;
  status: string;
  name: string;
}

const data: ArchiveDoc[] = [
  {
    id: 1,
    category: "Category A",
    folder: "Folder 1",
    status: "Archived",
    name: "Document 1",
  },
  {
    id: 2,
    category: "Category B",
    folder: "Folder 2",
    status: "Active",
    name: "Document 2",
  },
  {
    id: 3,
    category: "Category C",

    folder: "Folder 3",
    status: "Archived",
    name: "Document 3",
  },
  {
    id: 4,
    category: "Category D",
    folder: "Folder 4",
    status: "Active",
    name: "Document 4",
  },
  {
    id: 5,
    category: "Category E",
    folder: "Folder 5",
    status: "Archived",
    name: "Document 5",
  },
];

const columns: ColumnDef<ArchiveDoc>[] = [
  {
    accessorKey: "category",
    header: "Kategori Adı",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "folder",
    header: "Klasör Adı",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Dosya Adı",
    cell: (info) => info.getValue(),
  },
  {
    id: "actions",
    header: "İşlem",
    cell: () => (
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">View</Button>
          </TooltipTrigger>
          <TooltipContent>View Document</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Edit</Button>
          </TooltipTrigger>
          <TooltipContent>Edit Document</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

export default function ArchiveDocTable() {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  console.log(selectedCategory, selectedFolder);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <TooltipProvider>
      <div className="w-full overflow-scroll flex flex-col items-center justify-center no-scrollbar">
        <div className="flex justify-between w-full mb-4">
          <div className="flex gap-4">
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kategoriler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Category A">Category A</SelectItem>
                <SelectItem value="Category B">Category B</SelectItem>
                <SelectItem value="Category C">Category C</SelectItem>
                <SelectItem value="Category D">Category D</SelectItem>
                <SelectItem value="Category E">Category E</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedFolder}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Klasörler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Folder 1">Folder 1</SelectItem>
                <SelectItem value="Folder 2">Folder 2</SelectItem>
                <SelectItem value="Folder 3">Folder 3</SelectItem>
                <SelectItem value="Folder 4">Folder 4</SelectItem>
                <SelectItem value="Folder 5">Folder 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Dosya adı ara..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-64"
          />
        </div>
        <div className="rounded-md border w-full min-w-[800px] no-scrollbar">
          <div className="rounded-md border px-4 py-4 no-scrollbar">
            <Table className="table-fixed">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead key={header.id + index}>
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </TableHead>
                      );
                    })}
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
