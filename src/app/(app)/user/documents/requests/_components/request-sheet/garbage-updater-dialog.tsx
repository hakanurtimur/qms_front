import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dropzone } from "@/components/ui/dropZone";
import { Button } from "@/components/ui/button";

interface GarbageUpdaterDialogProps {
  open: boolean;
  onClose: () => void;
  onChange: (file: File | null) => void;
}

const GarbageUpdaterDialog = ({
  open,
  onClose,
  onChange,
}: GarbageUpdaterDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dosya Yenile</DialogTitle>
        </DialogHeader>
        <div className="h-40">
          <Dropzone
            fileExtensions={[
              "pdf",
              "doc",
              "docx",
              "xls",
              "xlsx",
              "ppt",
              "pptx",
              "jpg",
              "jpeg",
              "png",
            ]}
            className="h-full"
            onChange={onChange}
          />
        </div>
        <div className="flex items-end justify-end">
          <DialogClose asChild>
            <Button className="w-fit">Tamam</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GarbageUpdaterDialog;
