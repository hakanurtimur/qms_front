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

import { DatePicker } from "@/components/ui/date-picker";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import { Input } from "@/components/ui/input";
import { Dropzone } from "@/components/ui/dropZone";
import {
  ResultedRequestsReviseFormModel,
  SResultedRequestsReviseFormModel,
} from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";

interface DocumentReviseFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  documentTypeListQpts: { [key: string]: string };
  issueTypeList: RequestDocumentCreatedModel[];
  onSubmit: (data: ResultedRequestsReviseFormModel) => void;
}

export default function DocumentReviseForm({
  open,
  setOpen,
  issueTypeList,
  onSubmit,
}: DocumentReviseFormProps) {
  const form = useForm<ResultedRequestsReviseFormModel>({
    resolver: zodResolver(SResultedRequestsReviseFormModel),
    defaultValues: {},
  });

  const handleSubmit = (data: ResultedRequestsReviseFormModel) => {
    onSubmit(data as ResultedRequestsReviseFormModel);
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[740px] h-5/7 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Doküman Revize</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 p-6"
          >
            <div className="flex flex-row gap-6">
              <div className="flex flex-col w-56 gap-5  ">
                <FormField
                  control={form.control}
                  name="reviseNo"
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
                  name="issueTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baskı Türü</FormLabel>
                      <DynamicCombobox
                        name="IssueTypeId"
                        options={issueTypeList.reduce(
                          (
                            acc: { [key: string]: string },
                            item: RequestDocumentCreatedModel,
                          ) => {
                            if (item?.issueTypeId && item?.issueTypeName) {
                              acc[item.issueTypeId] = item.issueTypeName;
                            }
                            return acc;
                          },
                          {} as { [key: string]: string },
                        )}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revize Tarihi</FormLabel>
                      <FormControl>
                        <DatePicker
                          name="reviseDate"
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
                  name="archiveInfo"
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
                  name="formFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosya İsmi</FormLabel>
                      <FormControl>
                        <Dropzone
                          onChange={(value) => field.onChange(value)}
                          className="w-full h-32"
                          fileExtensions={["pdf"]}
                          key={field.value?.name ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
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
