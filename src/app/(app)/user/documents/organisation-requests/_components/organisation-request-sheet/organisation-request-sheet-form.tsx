import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { FolderIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SUpdateWaitingRequestModel,
  UpdateWaitingRequestModel,
  WaitingRequestModel,
} from "@/models/user/documents/waitingRequests/waitingRequestModel";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import { Dropzone } from "@/components/ui/dropZone";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowPathIcon,
  DocumentMagnifyingGlassIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import PdfViewer from "@/components/ui/pdf-viewer";
import useGetApprovedGarbageFile from "@/app/(app)/user/documents/organisation-requests/lib/hooks/useGetApprovedGarbageFile";
import { toast } from "@/hooks/use-toast";

interface Props {
  onSubmit: (data: UpdateWaitingRequestModel) => void;
  model?: WaitingRequestModel;
  variant: "default" | "actives";
  superAdminActionOpts: { [key: number]: string };
  superAdminAboutOpts: { [key: number]: string };
  handleGetGarbage: (fileId: string) => void;
  handleGetFile: (fileId: string) => void;
  documentTypeListQpts?: { [key: number]: string };
  handleRefresh?: () => void;
}
/* not genel yapıyı incele düzelt */

const OrganisationRequestSheetForm = ({
  onSubmit,
  model,
  variant,
  superAdminActionOpts,
  superAdminAboutOpts,
  handleGetGarbage,
  handleGetFile,
  documentTypeListQpts,
  handleRefresh,
}: Props) => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPdfViewer, setOpenPdfViewer] = useState(false);
  const [selectedSuperAdminAction, setSelectedSuperAdminAction] = useState(
    model?.superAdminActionId ?? 0,
  );
  console.log("open", open);
  const handleShow = () => setOpenPdfViewer(true);

  const { garbageSrc, getGarbageMutation } = useGetApprovedGarbageFile({
    handleShow,
    userId: user?.userId ?? "",
  });

  const form = useForm<UpdateWaitingRequestModel>({
    resolver: zodResolver(SUpdateWaitingRequestModel),
    defaultValues: {
      id: model?.id ?? 0,
      userId: user && user.userId ? +user.userId : 0,
      superAdminActionId: model?.superAdminActionId ?? undefined,
      documentTypeId: model?.documentTypeId ?? undefined,
      superAdminAboutId: model?.superAdminAboutId ?? undefined,
      descriptionSuperAdmin: model?.descriptionSuperAdmin ?? "",
      formFile: null,
      //,
    },
  });

  const handleGetApprovedGarbage = () => {
    if (!model?.approveGarbageId) return;
    getGarbageMutation.mutate(model?.approveGarbageId.toString());
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            async (formData: UpdateWaitingRequestModel) => {
              onSubmit(formData);
              if (handleRefresh) {
                await handleRefresh();
                setOpen(false);
              }
              setOpen(false);
            },
          )}
          className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8"
        >
          <div className="space-y-5 border-r-2 border-primary-600 pr-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talep No</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="w-full bg-primary-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormItem>
              <Label>Talep Eden</Label>
              <Input
                value={model?.userName ?? ""}
                readOnly
                className="w-full bg-primary-100"
              />
            </FormItem>
            <FormItem>
              <Label>Bölüm</Label>
              <Input
                value={model?.departmentName ?? ""}
                readOnly
                className="w-full bg-primary-100"
              />
              <FormMessage className="absolute" />
            </FormItem>
            <FormItem>
              <FormLabel>Talep Tipi</FormLabel>
              <Input
                value={model?.requestTypeName ?? ""}
                readOnly
                className="w-full bg-primary-100"
              />
            </FormItem>
            <FormItem>
              <FormLabel>Talep Tarihi</FormLabel>
              <Input name={"openDate"} value={model?.openDate ?? ""} readOnly />
            </FormItem>
            <FormItem>
              <FormLabel>Son İşlem Tarihi</FormLabel>
              <Input
                name={"updateDate"}
                value={model?.updateDate ?? ""}
                readOnly
              />
            </FormItem>
          </div>
          <div className="space-y-5 border-r-2 border-primary-600 pr-4">
            {variant === "actives" && documentTypeListQpts ? (
              <Combobox<UpdateWaitingRequestModel>
                control={form.control}
                variant={"in-column"}
                name={"documentTypeId"}
                label={"Doküman Tipi"}
                options={documentTypeListQpts}
                readonly={!!model?.approveGarbageId}
              />
            ) : (
              <FormItem>
                <Label>Doküman Tipi</Label>
                <FormControl>
                  <Input value={model?.documentTypeName} readOnly />
                </FormControl>
              </FormItem>
            )}

            <FormItem>
              <Label>{model?.userName} - Açıklama</Label>
              <Textarea
                value={model?.descriptionUser ?? ""}
                rows={5}
                className="w-full pb-3.5"
                readOnly
              />
            </FormItem>

            <FormItem>
              <Label>Durum</Label>
              <Input value={model?.actionName ?? ""} readOnly />
            </FormItem>

            <FormItem>
              <Label>{model?.adminName} - Açıklama</Label>
              <Textarea
                value={model?.descriptionAdmin ?? ""}
                rows={5}
                className="w-full pb-3.5"
                readOnly
              />
              <FormMessage className="absolute" />
            </FormItem>
          </div>
          <div className="space-y-5 pr-4">
            <Combobox<UpdateWaitingRequestModel>
              onChangeExtra={(value) => {
                setSelectedSuperAdminAction(+value);
                form.setValue("superAdminAboutId", 0);
              }}
              control={form.control}
              name={"superAdminActionId"}
              variant={"in-column"}
              label={"Kalite Durum"}
              options={superAdminActionOpts}
              readonly={variant === "default" || !!model?.approveGarbageId}
            />
            <FormField
              control={form.control}
              name="descriptionSuperAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{model?.superAdminName} - Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      readOnly={
                        variant === "default" || !!model?.approveGarbageId
                      }
                      className="w-full pb-3.5"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <Combobox<UpdateWaitingRequestModel>
              control={form.control}
              name={"superAdminAboutId"}
              variant={"in-column"}
              label={"Talep Nedeni"}
              options={superAdminAboutOpts}
              readonly={variant === "default" || !!model?.approveGarbageId}
            />
            <TooltipProvider>
              <div className="flex flex-col">
                {(!!model?.garbageId || !!model?.fileId) && (
                  <div className="text-sm font-medium leading-none h-[16.5px] flex items-end">
                    Doküman
                  </div>
                )}
                <div className="flex items-center gap-4 mt-4">
                  {model && model.garbageId ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            handleGetGarbage(model.garbageId.toString());
                            setOpen(true);
                          }}
                          type="button"
                          className="pb-3 pt-3 min-w-24 min-h-12"
                        >
                          <PencilSquareIcon className="min-h-8 max-h-8 w-auto" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Talep Edilen Doküman</TooltipContent>
                    </Tooltip>
                  ) : null}
                  {model && model.fileId ? (
                    <Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              handleGetFile(model.fileId.toString());
                            }}
                            type="button"
                            className="pb-3 pt-3 min-w-24 min-h-12"
                          >
                            <FolderIcon className="min-h-8 max-h-8 w-auto" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Mevcut Doküman</TooltipContent>
                      </Tooltip>
                    </Tooltip>
                  ) : null}
                </div>
                {selectedSuperAdminAction === 4 && variant === "actives" && (
                  <div className="flex items-center gap-4 mt-4">
                    {!model?.approveGarbageId ? (
                      <FormField
                        control={form.control}
                        name="formFile"
                        render={({ field }) => (
                          <>
                            <Dialog
                              open={openDialog}
                              onOpenChange={(open) => {
                                setOpenDialog(open);
                              }}
                            >
                              <DialogTrigger asChild className="mt-4">
                                <Button
                                  type="button"
                                  className="pb-3 pt-3 min-h-12 max-w-32 aspect-square gap-2"
                                >
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      {form.getValues("formFile") ? (
                                        <ArrowPathIcon className="w-4 h-4" />
                                      ) : (
                                        <PlusIcon className="w-4 h-4" />
                                      )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Doküman Yükle
                                    </TooltipContent>
                                  </Tooltip>
                                </Button>
                              </DialogTrigger>

                              <DialogContent>
                                <FormItem>
                                  <FormLabel>Dosya İsmi</FormLabel>
                                  <FormControl>
                                    <Dropzone
                                      onChange={(value) => {
                                        field.onChange(value);
                                        if (form.getValues("formFile")) {
                                          setOpenDialog(false);
                                        }
                                        toast({
                                          title: "Dosya eklendi",
                                          description:
                                            "Dosya başarıyla eklendi",
                                          variant: "success",
                                        });
                                      }}
                                      className="w-full h-32"
                                      fileExtensions={[
                                        "pdf",
                                        "doc",
                                        "docx",
                                        "xlsx",
                                        "xls",
                                      ]}
                                    />
                                  </FormControl>
                                </FormItem>
                              </DialogContent>
                            </Dialog>
                            <FormMessage className="mt-4" />
                          </>
                        )}
                      />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleGetApprovedGarbage}
                            type="button"
                            className="pb-3 pt-3 min-h-12 max-w-32 aspect-square gap-2"
                          >
                            <DocumentMagnifyingGlassIcon className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Onaylanmış Doküman</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
            </TooltipProvider>
          </div>
          <div className="col-span-3 pr-4">
            <SheetFooter>
              {variant === "default" ? (
                <SheetClose asChild>
                  <Button type="button">Kapat</Button>
                </SheetClose>
              ) : (
                <div className="flex gap-2">
                  <SheetClose asChild>
                    <Button type="button" variant="outline">
                      İptal Et
                    </Button>
                  </SheetClose>
                  <div className="flex items-center justify-center gap-2">
                    {form.getValues("superAdminActionId") === 4 && (
                      <Tooltip>
                        <TooltipTrigger>
                          <InformationCircleIcon className="w-6 h-6 text-primary-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Talep üst yönetici onay sürecindedir
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <SheetClose asChild>
                      <Button
                        disabled={!!model?.approveGarbageId}
                        type="submit"
                      >
                        Kaydet
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              )}
            </SheetFooter>
          </div>
        </form>
      </Form>
      {getGarbageMutation.data && (
        <PdfViewer
          variant={"view"}
          open={openPdfViewer}
          onOpenChange={() => setOpenPdfViewer(false)}
          fileName={""}
          src={garbageSrc ?? ""}
        />
      )}
    </>
  );
};

export default OrganisationRequestSheetForm;
