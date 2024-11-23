"use client";

import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ArrowUpDownIcon, Edit, InfoIcon } from "lucide-react";
import ArchiveDocSheet from "./archive-doc-sheet";

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
    name: "Document  4  lorem ipsum dolor sit amet consectetur adipisicing elit et consectetur adipisicing sit",
  },
  {
    id: 5,
    category: "Category E",
    folder: "Folder 5",
    status: "Archived",
    name: "Document 5",
  },
  {
    id: 6,
    category: "Random Category",
    folder: "Random Folder",
    status: "Active",
    name: "Random Document",
  },
  {
    id: 7,
    category: "Other Category",
    folder: "Other Folder",
    status: "Archived",
    name: "Other Document",
  },
  {
    id: 8,
    category: "Another Category",
    folder: "Another Folder",
    status: "Active",
    name: "Another Document",
  },
  {
    id: 9,
    category: "Some Category",
    folder: "Some Folder",
    status: "Archived",
    name: "Some Document",
  },
  {
    id: 10,
    category: "Any Category",
    folder: "Any Folder",
    status: "Active",
    name: "Any Document",
  },
];

// eslint-disable-next-line react-hooks/rules-of-hooks
export default function ArchiveDocTable() {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<ArchiveDoc[]>(data);
  const [openArchiveDocSheet, setOpenArchiveDocSheet] = React.useState(false);
  const columns: ColumnDef<ArchiveDoc>[] = [
    {
      accessorKey: "category",
      header: () => (
        <div className="w-48 flex items-center">
          Kategori
          <ArrowUpDownIcon className="w-4 h-4 ml-1" />
        </div>
      ),
      cell: (info) => <div className="">{String(info.getValue())}</div>,
    },
    {
      accessorKey: "folder",
      header: () => (
        <div className="w-48 pl-14 flex items-center">
          Klasör Adı
          <ArrowUpDownIcon className="w-4 h-4 ml-1" />
        </div>
      ),
      cell: (info) => (
        <div className="w-52 pl-14">{String(info.getValue())}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="w-48 flex items-center">
          Durum
          <ArrowUpDownIcon className="w-4 h-4 ml-1" />
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: () => <div className="w-96 flex items-center">Dosya Adı</div>,
      cell: (info) => (
        <div
          className="w-96 
        overflow-hidden overflow-ellipsis whitespace-nowrap
      "
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate">{String(info.getValue())}</div>
            </TooltipTrigger>
            <TooltipContent>{String(info.getValue())}</TooltipContent>
          </Tooltip>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "actions",
      header: () => (
        <div className="text-right w-56  flex justify-end items-end">İşlem</div>
      ),
      cell: () => (
        <div className="flex items-center justify-end gap-4">
          <Tooltip>
            <TooltipTrigger
              asChild
              onClick={() => setOpenArchiveDocSheet(true)}
            >
              <Edit className="w-9 h-9 p-2 rounded-md border text-white bg-black-900 hover:bg-black-800 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Dökümanı Gör</TooltipContent>
          </Tooltip>
        </div>
      ),
      meta: {
        style: {
          minWidth: 100,
          maxWidth: 100,
        },
      },
    },
  ];
  const handleSearch = () => {
    // Klasör ve kategoriye göre arama yap
    const results = data.filter(
      (item) =>
        (selectedCategory ? item.category === selectedCategory : true) &&
        (selectedFolder ? item.folder === selectedFolder : true),
    );
    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedFolder]);

  // Kategori seçimi
  const handleCategoryChange = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
    handleSearch();
  };

  // Klasör seçimi
  const handleFolderChange = (folder: string) => {
    setSelectedFolder(folder);
    handleSearch();
  };

  console.log(selectedCategory, selectedFolder);

  const table = useReactTable({
    data: searchResults,
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
      <div className="w-full overflow-scroll flex flex-col items-center justify-center no-scrollbar border  rounded">
        <div className="flex justify-between gap-10 w-full mb-4  items-center">
          <div className="flex  items-center justify-center gap-8 pt-3 px-4">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon
                    className="w-6 h-6 text-black-700 cursor-pointer"
                    aria-label="Açıklama"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="
                  max-w-[300px]
                  ml-72
                "
                >
                  Bu bölümde hastanemizde kullanılan rıza belgeleri ve kalite
                  dokümanları bulunmaktadır. Rıza belgeleri, hasta onaylarını ve
                  bilgilerini kaydederken, kalite dokümanları hizmet
                  standartlarını belirleyerek sürekli iyileştirmeyi destekler.
                </TooltipContent>
              </Tooltip>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-56 h-10">
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
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon
                    className="w-6 h-6 text-black-700 cursor-pointer"
                    aria-label="Açıklama"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="
                  max-w-[300px]
                  ml-72
                "
                >
                  Bu klasörde, hastanemizdeki tıbbi hizmetleri yürüten tüm
                  bölümler ve ilgili rıza belgeleri bulunmaktadır. Her bölüm,
                  uzmanlık alanına göre ayrılmış olup, tedavi süreçlerinde
                  gereken belgeleri içerir.
                </TooltipContent>
              </Tooltip>
              <Select onValueChange={handleFolderChange}>
                <SelectTrigger className="w-56 h-10">
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
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon
                  className="w-6 h-6 mt-3 text-black-700 cursor-pointer"
                  aria-label="Açıklama"
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="
                max-w-[300px]
                ml-72
                "
              >
                Bu bölüm, tüm dokümanların isim ve kodlarını içermekte olup,
                kullanıcıların aradıkları belgelere kolayca ulaşmalarını sağlar.
              </TooltipContent>
            </Tooltip>
            <Input
              placeholder="Dosya adı ara..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-[473px] h-10 mx-4 mt-3
            "
            />
          </div>
        </div>
        <div className="rounded-md border w-full min-w-[800px] no-scrollbar">
          <div className="rounded-md  px-4 py-4 no-scrollbar">
            <Table className="table-fixed">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead key={header.id + index}>
                          <div
                            className="flex items-center cursor-pointer hover:text-black-900"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}

                            {{}[header.column.getIsSorted() as string] ?? null}
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
        <ArchiveDocSheet
          isOpen={openArchiveDocSheet}
          setIsOpen={setOpenArchiveDocSheet}
        />
      </div>
    </TooltipProvider>
  );
}
