import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

export const columns: ColumnDef<RequestDocumentListModel>[] = [
  {
    accessorKey: "categoryName",
    header: () => (
      <div className="flex items-center gap-1 ">
        Kategori
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => <div className="">{String(info.getValue())}</div>,
    size: 180,
    footer: "Kategori",
  },
  {
    accessorKey: "folderName",
    header: () => (
      <div className="flex items-center gap-1">
        Klasör Adı
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => <div className="">{String(info.getValue())}</div>,
    size: 140,
    footer: "Klasör Adı",
  },
  {
    accessorKey: "fileName",
    header: () => (
      <div className=" flex items-center gap-1">
        Dosya Adı
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => (
      <div
        className="
        overflow-hidden overflow-ellipsis whitespace-nowrap
      "
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="truncate">
              {String(info.getValue()).toUpperCase()}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {String(info.getValue()).toUpperCase()}
          </TooltipContent>
        </Tooltip>
      </div>
    ),
    size: 200,
    footer: "Dosya Adı",
  },
  {
    accessorKey: "state",
    header: () => (
      <div className="flex items-center justify-between gap-1">
        Durum
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => (
      <div className="">{info.getValue() ? "AKTIF" : "PASİF"}</div>
    ),
    size: 65,
    footer: "Durum",
  },
];
