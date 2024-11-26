"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  DocumentReviseModel,
  IDocumentReviseSchema,
} from "../model/document-revise.model";
import { DatePicker } from "@/components/ui/date-picker";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import { Input } from "@/components/ui/input";
import { Dropzone } from "@/components/ui/dropZone";

interface DocumentReviseFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DocumentReviseForm({
  open,
  setOpen,
}: DocumentReviseFormProps) {
  const form = useForm<DocumentReviseModel>({
    resolver: zodResolver(IDocumentReviseSchema),
    defaultValues: {
      Id: 0,
      UserId: 0,
      DocumentTypeId: 0,
      FileId: 0,
      ReviseNo: "",
      Code: "",
      Name: "",
      ReviseDate: "",
      ArchiveInfo: "",
      IssueTypeId: 0,
      Description: "",
    },
  });

  function onSubmit(data: DocumentReviseModel) {
    console.log(data);
    setOpen(false);
  }

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 z-10 bg-gray-800 backdrop-blur-sm bg-opacity-60 transition-opacity" />
      <DialogContent className="max-w-[970px] h-5/7 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Döküman Revize</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6"
          >
            <div className="flex flex-row gap-6">
              <div className="flex flex-col w-56 gap-2">
                <FormField
                  control={form.control}
                  name="DocumentTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Belge Türü</FormLabel>
                      <DynamicCombobox
                        name="DocumentTypeId"
                        options={{
                          1: "Broşür",
                          2: "Bilgi Föyleri",
                        }}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ReviseNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revize No</FormLabel>
                      <FormControl>
                        <Input placeholder="Revize No" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kod</FormLabel>
                      <FormControl>
                        <Input placeholder="Kod" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-56 gap-2">
                <FormField
                  control={form.control}
                  name="IssueTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sorun Türü</FormLabel>
                      <DynamicCombobox
                        name="IssueTypeId"
                        options={{
                          1: "Elektronik",
                          2: "Baskı",
                          3: "Dijital",
                        }}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ReviseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revize Tarihi</FormLabel>
                      <FormControl>
                        <DatePicker
                          name="ReviseDate"
                          onChange={(date) => field.onChange(date)}
                          includeTime={false}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ArchiveInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arşiv Bilgisi</FormLabel>
                      <FormControl>
                        <Input placeholder="Arşiv Bilgisi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1 h-80 rounded-sm bg-black-100 text-black-800"></div>
              <div className="flex flex-col gap-2 w-[350px]">
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosya İsmi</FormLabel>
                      <FormControl>
                        <Dropzone
                          onChange={(value) => field.onChange(value)}
                          className="w-full h-32"
                          fileExtensions={["pdf"]}
                          key={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Açıklama girin"
                          {...field}
                          className="min-h-40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                variant="outline"
                type="button"
              >
                Vazgeç
              </Button>
              <Button type="submit">Gönder</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
