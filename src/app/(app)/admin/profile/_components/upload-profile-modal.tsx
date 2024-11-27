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
import { Dropzone } from "@/components/ui/dropZone";

interface UploadProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onUpload: (file: File) => void;
}

export default function UploadProfileModal({
  open,
  setOpen,
  onUpload,
}: UploadProfileModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      onUpload(file);
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
            <Dropzone
              onChange={(file) => {
                if (file) {
                  setFile(file);
                }
              }}
              fileExtensions={["png", "jpg", "jpeg"]}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleSubmit}>
              Vazgeç
            </Button>
            <Button type="submit">Kaydet</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
