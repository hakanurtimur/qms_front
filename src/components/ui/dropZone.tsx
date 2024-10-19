import React, { forwardRef, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Import an "×" icon

interface DropzoneProps {
  onChange: (file: File | null) => void;
  className?: string;
  fileExtension?: string;
}

export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  ({ onChange, className, fileExtension, ...props }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInfo, setFileInfo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      handleFiles(files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (files) {
        handleFiles(files);
      }
    };

    const handleFiles = (files: FileList) => {
      const uploadedFile = files[0];

      if (
        fileExtension &&
        !uploadedFile.name
          .toLowerCase()
          .endsWith(`.${fileExtension.toLowerCase()}`)
      ) {
        setError(`Geçersiz dosya türü. Beklenen: .${fileExtension}`);
        onChange(null); // Clear the value in the form
        return;
      }

      const fileSizeInKB = Math.round(uploadedFile.size / 1024); // Convert to KB

      onChange(uploadedFile); // Pass the file to onChange

      setFileInfo(`Yüklenen dosya: ${uploadedFile.name} (${fileSizeInKB} KB)`);
      setError(null);
    };

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    // **New function to handle clearing the file**
    const handleClearFile = () => {
      // Clear the input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFileInfo(null);
      setError(null);
      onChange(null); // Notify the parent form that the file has been cleared
    };

    return (
      <Card
        className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
        {...props}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="font-medium">Dosyaları Sürükleyin veya</span>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              className="ml-2 h-8 px-2 text-xs"
              onClick={handleButtonClick}
            >
              tıklayın
            </Button>
            <input
              ref={(node) => {
                fileInputRef.current = node;
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  (
                    ref as React.MutableRefObject<HTMLInputElement | null>
                  ).current = node;
                }
              }}
              type="file"
              accept={`.${fileExtension}`} // Set accepted file type
              onChange={handleFileInputChange}
              className="hidden"
              multiple={false}
            />
          </div>
          {fileInfo && (
            <div className="flex items-center justify-between w-full px-2">
              <p className="text-muted-foreground">{fileInfo}</p>
              <button
                type="button"
                onClick={handleClearFile}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Dosyayı Sil"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          {error && <span className="text-red-500">{error}</span>}
        </CardContent>
      </Card>
    );
  },
);

Dropzone.displayName = "Dropzone";
