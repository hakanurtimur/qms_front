import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  open: boolean;
  onOpenChange: () => void;
  fileName: string | null;
  src: string;
  variant?: "default" | "printible" | "view";
  data?: RequestDocumentListModel;
}

const PdfViewer = ({
  open,
  onOpenChange,
  fileName,
  src,
  variant = "default",
  data,
}: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handlePageChange = (page: number) => {
    if (!numPages) return;
    if (page < 1 || page > numPages) return;
    setPageNumber(page);
  };
  const adjustedSrc =
    variant === "default" || variant === "view"
      ? src.replace("https://www.osmanoguzsensoy.com", "")
      : src;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-7xl w-full">
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        {variant === "default" && (
          <div className="flex flex-row gap-4 items-center justify-center">
            <FormItem>
              <Label>Hazırlayan</Label>
              <Input readOnly value={data?.qualityUserName || ""} />
            </FormItem>
            <FormItem>
              <Label>Kontrol Eden</Label>
              <Input readOnly value={data?.qualityManagerUserName || ""} />
            </FormItem>
            <FormItem>
              <Label>Onaylayan</Label>
              <Input
                readOnly
                value={data?.qualityAdministratorUserName || ""}
              />
            </FormItem>
          </div>
        )}
        {(variant === "default" || variant === "view") && (
          <div className="mx-h-[600px]">
            <Document
              className="max-h-[500px] min-h-[500px] overflow-y-scroll text-center"
              file={adjustedSrc}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                className="flex justify-center items-center flex-col"
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            <div className="flex gap-2 items-center justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        handlePageChange(pageNumber - 1);
                      }}
                    />
                  </PaginationItem>

                  {Array.from({ length: numPages || 0 }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => {
                          handlePageChange(index + 1);
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        handlePageChange(pageNumber + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
        {variant === "printible" && (
          <iframe src={src} className="w-full h-[600px]" />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Kapat</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;