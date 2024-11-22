"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UploadProfileModal({
  open,
  setOpen,
}: UploadProfileModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      // Dosya yükleme işlemi burada yapılabilir
      console.log("Yüklenecek dosya:", file);
      setOpen(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Fotoğraf Yükle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Vazgeç
            </Button>
            <Button type="submit">Kaydet</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
