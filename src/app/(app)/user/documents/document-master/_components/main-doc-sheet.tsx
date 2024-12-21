import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  DocumentMasterMainSheetModal,
  DocumentMasterMainSheetModelRequest,
  SDocumentMasterMainSheetModal,
} from "@/models/user/documents/document-master/DocumentMasterModels";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { DialogOverlay } from "@/components/ui/dialog";
import { RequestDocumentCreatedModel } from "@/models/user/documents/documents/requestDocumentCreate";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";

type MainDocSheetProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: DocumentMasterMainSheetModal;
  rowId: string;
  handleHistoryButton: (code: string) => void;
  issueTypeList: RequestDocumentCreatedModel[];
  handleSubmit: (data: DocumentMasterMainSheetModelRequest) => void;
};

const MainDocSheet: React.FC<MainDocSheetProps> = ({
  isOpen,
  setIsOpen,
  data,
  rowId,
  handleHistoryButton,
  issueTypeList,
  handleSubmit,
}) => {
  const form = useForm<DocumentMasterMainSheetModal>({
    resolver: zodResolver(SDocumentMasterMainSheetModal),
    defaultValues: {
      folderName: data?.folderName ?? "",
      documentTypeName: data?.documentTypeName ?? "",
      lastReviseNo: data?.lastReviseNo ?? 0,
      lastReviseDate: data?.lastReviseDate ?? "",
      code: data?.code ?? "",
      publishDate: data?.publishDate ?? "",
      issueTypeId: data?.issueTypeId ?? 0,
      archiveInfo: data?.archiveInfo ?? "",
      lookOutDate: data?.lookOutDate ?? "",
    },
  });

  const handleSubmitForm = (data: DocumentMasterMainSheetModal) => {
    const updatedData: DocumentMasterMainSheetModelRequest = {
      issueTypeId: data.issueTypeId ?? 0,
      lookOutDate: data.lookOutDate ?? "",
      archiveInfo: data.archiveInfo ?? "",
    };
    console.log("updatedData", updatedData);
    handleSubmit(updatedData);
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity backdrop-blur-sm" />
        <SheetContent className="sm:max-w-[400px] lg:max-w-[550px]">
          <SheetHeader>
            <SheetTitle>Detay Bilgileri</SheetTitle>
            <SheetDescription>
              Buradan taleblerinizi düzenleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitForm)}
                className="space-y-4 flex flex-col"
              >
                <div className="w-full h-full flex gap-4">
                  <div className="flex flex-col gap-2 w-56">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sıra No</FormLabel>
                          <FormControl>
                            <Input readOnly {...field} value={rowId} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="folderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Klasör Adı</FormLabel>
                          <FormControl>
                            <Input
                              readOnly
                              {...field}
                              value={data?.folderName}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="documentTypeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Döküman Tipi</FormLabel>
                          <FormControl>
                            <Input
                              readOnly
                              {...field}
                              value={data.documentTypeName}
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
                          <FormLabel>Dosya Kodu</FormLabel>
                          <FormControl>
                            <Input readOnly {...field} value={data.code} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastReviseNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Revize No</FormLabel>
                          <FormControl>
                            <Input readOnly {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="h-full ps-1 rounded-md text-gray-200 bg-gray-200" />

                  <div className="flex flex-col gap-2 w-56">
                    <FormField
                      control={form.control}
                      name="lastReviseDate"
                      render={() => (
                        <FormItem>
                          <FormLabel>Revize Tarihi</FormLabel>
                          <FormControl>
                            <DatePicker
                              readonly={true}
                              name="reviseDate"
                              value={form.getValues("lastReviseDate")}
                            />
                          </FormControl>
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
                              readonly={true}
                              {...field}
                              value={field.value}
                              placeholder=""
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="lookOutDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gözden Geçirme Tarihi</FormLabel>
                          <FormControl>
                            <DatePicker
                              name="lookOutDate"
                              onChange={(date) => field.onChange(date)}
                              placeholder=""
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
                          <FormLabel>Arşiv Süresi</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              defaultValue={data?.archiveInfo}
                            />
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
                          <FormLabel>Baskı Tipi</FormLabel>
                          <FormControl>
                            <DynamicCombobox
                              name="issueTypeId"
                              key={data?.issueTypeId}
                              defaultValue={data?.issueTypeId}
                              options={issueTypeList.reduce(
                                (
                                  acc: { [key: string]: string },
                                  item: RequestDocumentCreatedModel,
                                ) => {
                                  if (
                                    item?.issueTypeId &&
                                    item?.issueTypeName
                                  ) {
                                    acc[item?.issueTypeId] =
                                      item?.issueTypeName;
                                  }
                                  return acc;
                                },
                                {} as { [key: string]: string },
                              )}
                              onChange={(value) => field.onChange(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    <div
                      className="bg-primary-800 mt-1 px-3 py-2 text-sm font-medium rounded-md text-white cursor-pointer hover:bg-black-700"
                      onClick={() => {
                        handleHistoryButton(String(data.code));
                      }}
                    >
                      Tarihçe
                    </div>
                  </div>
                  <div className="flex gap-5 mt-1">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      İptal
                    </Button>
                    <Button type="submit">Kaydet</Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainDocSheet;
