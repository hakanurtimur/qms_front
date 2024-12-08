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
} from "@/components/ui/pagination";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

  const [isZoomed, setIsZoomed] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handlePageChange = (page: number) => {
    if (!numPages) return;
    if (page < 1 || page > numPages) return;
    setPageNumber(page);
  };
  const adjustedSrc =
    process.env.NEXT_PUBLIC_REGULAR_PROXY_URL === undefined
      ? "test"
      : variant === "default" || variant === "view"
        ? src.replace(process.env.NEXT_PUBLIC_REGULAR_PROXY_URL, "")
        : src;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${isZoomed ? "min-w-screen-90 max-w-screen-90 max-h-screen-90" : "max-w-3xl min-h-screen-90 max-h-screen-90"} w-full flex gap-2 flex-col items-center justify-center`}
      >
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
          <div className="max-h-[600px] overflow-y-scroll">
            <Document
              className={`h-full  text-center flex items-center justify-center`}
              file={adjustedSrc}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                className="flex justify-center items-center flex-col w-full"
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={1000}
              />
            </Document>
          </div>
        )}
        {variant === "printible" && (
          <iframe src={src} className="w-full h-[600px]" />
        )}
        <DialogFooter className="w-full flex items-center gap-5 justify-between">
          <div className="min-w-32"></div>
          {numPages !== 0 && numPages && (
            <div className=" flex-1 flex gap-2 items-center justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      onClick={() => {
                        handlePageChange(pageNumber - 1);
                      }}
                      variant={"ghost"}
                      className="flex gap-2"
                    >
                      <ChevronLeftIcon className="w-4 h-4" /> Önceki
                    </Button>
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
                    <Button
                      onClick={() => {
                        handlePageChange(pageNumber + 1);
                      }}
                      variant={"ghost"}
                      className="flex gap-2"
                    >
                      Sonraki <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          <div className="min-w-32 flex flex-row gap-4">
            <Button
              onClick={() => {
                setIsZoomed(!isZoomed);
              }}
              variant="outline"
              size={"icon"}
              disabled
            >
              {isZoomed ? (
                <ArrowsPointingInIcon className="w-4 h-4" />
              ) : (
                <ArrowsPointingOutIcon className="w-4 h-4" />
              )}
            </Button>
            <DialogClose asChild>
              <Button>Kapat</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
