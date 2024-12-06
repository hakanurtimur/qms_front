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
import { Dropzone } from "@/components/ui/dropZone";
import { Input } from "@/components/ui/input";
import {
  ResultedRequestsFormModel,
  SResultedRequestsFormModel,
} from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import { RequestDocumentListModel } from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";

interface DocumentUploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  documentTypeListQpts: { [key: string]: string };
  categoryFolderList: RequestDocumentListModel[];
  hiddenTypeList: RequestDocumentCreatedModel[];
  issueTypeList: RequestDocumentCreatedModel[];
  onSubmit: (data: ResultedRequestsFormModel) => void;
}

export default function DocumentUploadForm({
  open,
  setOpen,
  documentTypeListQpts,
  categoryFolderList,
  hiddenTypeList,
  issueTypeList,
  onSubmit,
}: DocumentUploadFormProps) {
  const form = useForm<ResultedRequestsFormModel>({
    resolver: zodResolver(SResultedRequestsFormModel),
    defaultValues: {},
  });

  const handleSubmit = (data: ResultedRequestsFormModel) => {
    onSubmit(data);
    setOpen(false);
  };

  if (!open) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[970px] h-5/7 flex flex-col   ">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Doküman Yükle</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 p-6"
          >
            <div className="flex flex-row gap-6">
              <div className="flex flex-col w-56 gap-2">
                <FormField
                  control={form.control}
                  name="documentTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doküman Tipi</FormLabel>
                      <DynamicCombobox
                        name="documentTypeId"
                        options={documentTypeListQpts}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="folderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Klasör</FormLabel>
                      <DynamicCombobox
                        name="folderId"
                        options={categoryFolderList.reduce(
                          (
                            acc: { [key: string]: string },
                            item: RequestDocumentListModel,
                          ) => {
                            acc[item?.folderId] = item?.folderName;
                            return acc;
                          },
                          {},
                        )}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hiddenId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Görünürlük</FormLabel>
                      <DynamicCombobox
                        name="hidden"
                        options={hiddenTypeList.reduce(
                          (
                            acc: { [key: string]: string },
                            item: RequestDocumentCreatedModel,
                          ) => {
                            if (item?.hiddenId && item?.hiddenName) {
                              acc[item.hiddenId] = item.hiddenName;
                            }
                            return acc;
                          },
                          {},
                        )}
                        onChange={(value) => field.onChange(value)}
                      />
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

              <div className="flex flex-col w-56 gap-2">
                <FormField
                  control={form.control}
                  name="issueTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baskı Bilgisi</FormLabel>
                      <DynamicCombobox
                        name="issueTypeId"
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
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yayın Tarihi</FormLabel>
                      <FormControl>
                        <DatePicker
                          name="publishDate"
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
                  name="code"
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
                          onChange={(file) => field.onChange(file)}
                          className="w-full min-h-28"
                          fileExtensions={["pdf"]}
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
            <div className="flex justify-end gap-3">
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
