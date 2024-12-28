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
  DocumentMasterHistoryModel,
  DocumentMasterHistoryModelRequest,
  SDocumentMasterHistoryModel,
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
import { DialogOverlay } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import FormDatePicker from "@/components/ui/form-date-picker";

type HistorySheetProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: DocumentMasterHistoryModel;
  setSubmitData: (data: DocumentMasterHistoryModelRequest) => void;
};

const HistorySheet: React.FC<HistorySheetProps> = ({
  isOpen,
  setIsOpen,
  data,
  setSubmitData,
}) => {
  const form = useForm<DocumentMasterHistoryModel>({
    resolver: zodResolver(SDocumentMasterHistoryModel),
    defaultValues: {
      reviseNo: data?.reviseNo,
      userName: data?.userName,
      superAdminName: data?.superAdminName,
      administratorName: data?.administratorName,
      publishDate: data?.publishDate,
      reviseDate: data?.reviseDate,
      description: data?.description,
    },
  });

  const onSubmit = (data: DocumentMasterHistoryModel) => {
    setSubmitData({
      reviseNo: data.reviseNo,
      reviseDate: data.reviseDate,
      publishDate: data.publishDate,
      description: data.description,
    });
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="fixed inset-0 bg-gray-900 bg-opacity-10 transition-opacity backdrop-blur-sm" />
        <SheetContent className="sm:max-w-[400px] lg:max-w-[600px] z-50">
          <SheetHeader>
            <SheetTitle>Revize Bilgileri</SheetTitle>
            <SheetDescription>
              Buradan revize bilgilerini görüntüleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex">
            <Form {...form}>
              <form
                className="space-y-4 flex flex-col"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="w-full h-full flex gap-4">
                  <div className="flex flex-col gap-2 w-56">
                    <FormField
                      control={form.control}
                      name="reviseNo"
                      render={() => (
                        <FormItem>
                          <FormLabel>Revize No</FormLabel>
                          <FormControl>
                            <Input
                              defaultValue={data?.reviseNo}
                              onChange={(e) =>
                                form.setValue("reviseNo", e.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormDatePicker
                      control={form.control}
                      name={"reviseDate"}
                      label={"Revize Tarihi"}
                    />
                    <FormDatePicker
                      control={form.control}
                      name="publishDate"
                      label="Yayın Tarihi"
                    />
                    <FormField
                      control={form.control}
                      name="userName"
                      render={() => (
                        <FormItem>
                          <FormLabel>Talep Eden</FormLabel>
                          <FormControl>
                            <Input readOnly value={data?.userName} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="superAdminName"
                      render={() => (
                        <FormItem>
                          <FormLabel>Kalite Sorumlusu</FormLabel>
                          <FormControl>
                            <Input readOnly value={data?.superAdminName} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="administratorName"
                      render={() => (
                        <FormItem>
                          <FormLabel>Onaylayan</FormLabel>
                          <FormControl>
                            <Input readOnly value={data?.administratorName} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="h-full ps-1 rounded-md text-gray-200 bg-gray-200" />
                  <div className="flex flex-col gap-2 w-72 h-full">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Açıklama</FormLabel>
                          <FormControl>
                            <Textarea
                              defaultValue={data.description}
                              className="h-40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-5 mt-1">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Kapat
                  </Button>
                  <Button type="submit">Kaydet</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HistorySheet;
