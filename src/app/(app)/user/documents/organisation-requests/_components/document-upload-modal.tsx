"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
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
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import { Dropzone } from "@/components/ui/dropZone";
import { Input } from "@/components/ui/input";
import {
  ResultedRequestsFormModel,
  SResultedRequestsFormModel,
} from "@/models/user/documents/waitingRequests/resultedRequestsFormModel";
import { UserCategoryFolderListModel } from "@/models/user/documents/documents/requestDocument";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon } from "@heroicons/react/24/outline";
import Combobox from "@/components/ui/combobox";
import FormDatePicker from "@/components/ui/form-date-picker";

interface DocumentUploadFormProps {
  open: boolean;
  documentTypeListQpts: { [key: string]: string };
  categoryFolderList: UserCategoryFolderListModel[];
  issueTypeList: RequestDocumentCreatedModel[];
  handleDocumentTypeChange: (value: number) => void;
  onSubmitDocumentUpload: (data: ResultedRequestsFormModel) => void;
  rowId: string;
  handleOpenDocumentUploadModal: (id: string) => void;
}

export default function DocumentUploadForm({
  open,
  documentTypeListQpts,
  issueTypeList,
  onSubmitDocumentUpload,
  categoryFolderList,
  handleDocumentTypeChange,
  rowId,
  handleOpenDocumentUploadModal,
}: DocumentUploadFormProps) {
  const form = useForm<ResultedRequestsFormModel>({
    resolver: zodResolver(SResultedRequestsFormModel),
    defaultValues: {},
  });

  const handleSubmit = (data: ResultedRequestsFormModel) => {
    onSubmitDocumentUpload(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpenDocumentUploadModal(rowId);
      }}
    >
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={"icon"}
              onClick={() => handleOpenDocumentUploadModal(rowId)}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Doküman Yükle</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="max-w-[970px] h-5/7 flex flex-col">
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
                <Combobox
                  control={form.control}
                  name={"documentTypeId"}
                  label={"Doküman Tipi"}
                  options={documentTypeListQpts}
                  variant={"in-column"}
                  onChangeExtra={(value: string | number) => {
                    handleDocumentTypeChange(+value);
                  }}
                />
                <Combobox
                  control={form.control}
                  name="folderId"
                  label={"Klasör"}
                  options={categoryFolderList.reduce(
                    (
                      acc: { [key: string]: string },
                      item: UserCategoryFolderListModel,
                    ) => {
                      acc[item?.folderId] = item?.folderName;
                      return acc;
                    },
                    {},
                  )}
                  variant={"in-column"}
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
                <FormDatePicker
                  control={form.control}
                  name="publishDate"
                  label={"Yayın Tarihi"}
                />
                <FormDatePicker
                  control={form.control}
                  name="reviseDate"
                  label={"Revize Tarihi"}
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
                          fileExtensions={["pdf", "doc", "docx", "xlsx", "xls"]}
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
              <DialogClose>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Vazgeç
                </Button>
              </DialogClose>
              <Button type="submit">Gönder</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
