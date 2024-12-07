"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import HistoryTable from "./history-table";
import { DocumentMasterHistoryModel } from "@/models/user/documents/document-master/DocumentMasterModels";

interface DocumentReviseFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  historyTableData: DocumentMasterHistoryModel[];
  handleSelectedRow: (id: string) => void;
}

export default function DocumentMasterHistoryModal({
  open,
  setOpen,
  historyTableData,
  handleSelectedRow,
}: DocumentReviseFormProps) {
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <DialogContent className="max-w-[1140px] h-5/7 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Doküman Revize</DialogTitle>
        </DialogHeader>
        <HistoryTable
          data={historyTableData}
          handleSelectedRow={handleSelectedRow}
        />
      </DialogContent>
    </Dialog>
  );
}
