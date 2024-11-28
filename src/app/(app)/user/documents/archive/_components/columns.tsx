import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, EyeIcon } from "lucide-react";

export const columns: ColumnDef<RequestDocumentListModel>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <div className="flex items-center gap-1 ">
        <EyeIcon
          className="w-6 h-6 cursor-pointer hover:text-black-900 hover:scale-125 "
          onClick={() =>
            column.toggleVisibility(
              column.getIsVisible() === true ? false : true,
            )
          }
        />
        Kategori
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => <div className="">{String(info.getValue())}</div>,
    size: 180,
  },
  {
    accessorKey: "folderName",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <EyeIcon
          className="w-6 h-6 cursor-pointer hover:text-black-900 hover:scale-125 "
          onClick={() =>
            column.toggleVisibility(
              column.getIsVisible() === true ? false : true,
            )
          }
        />
        Klasör Adı
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => <div className="">{String(info.getValue())}</div>,
    size: 140,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <div className="flex items-center justify-between gap-1">
        <EyeIcon
          className="w-6 h-6 cursor-pointer hover:text-black-900 hover:scale-125"
          onClick={() =>
            column.toggleVisibility(
              column.getIsVisible() === true ? false : true,
            )
          }
        />
        Durum
        <ArrowUpDownIcon className="w-4 h-4 ml-1 hover:scale-125" />
      </div>
    ),
    cell: (info) => (
      <div className="">{info.getValue() ? "AKTIF" : "PASİF"}</div>
    ),
    size: 65,
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => (
      <div className=" flex items-center gap-1">
        <EyeIcon
          className="w-6 h-6 cursor-pointer hover:text-black-900 hover:scale-125"
          onClick={() =>
            column.toggleVisibility(
              column.getIsVisible() === true ? false : true,
            )
          }
        />
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
  },
];
