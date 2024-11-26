"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RemoveProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRemove: () => void;
}

export default function RemoveProfileModal({
  open,
  setOpen,
  onRemove,
}: RemoveProfileModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Profil Fotoğrafını kaldırmak üzeresiniz.</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Bu işlemi gerçekleştirmek istediğinizden emin misiniz?</p>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Vazgeç
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                onRemove();
                setOpen(false);
              }}
            >
              Kaydet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
