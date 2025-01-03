"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FolderIcon } from "@heroicons/react/24/solid";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
const PatientFeedbackForm: React.FC = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6 border-r border-primary-900 pr-8">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-2">
                <FormItem>
                  <FormLabel>Bildirim No</FormLabel>
                  <Input readOnly value={"443835123"} className="bg-gray-100" />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem>
                  <FormLabel>Bildirim Tipi</FormLabel>
                  <Input
                    readOnly
                    value={"Hasta Geri Bildirim"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Bildirimi Yapan Kişi</FormLabel>
                  <Input
                    readOnly
                    value={"Sebahattin"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-2">
                <FormItem>
                  <FormLabel>Protokol No</FormLabel>
                  <Input readOnly value={"443835123"} className="bg-gray-100" />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem>
                  <FormLabel>Hasta Yaşı</FormLabel>
                  <Input readOnly value={"25"} className="bg-gray-100" />
                </FormItem>
              </div>
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Hasta Adı Soyadı</FormLabel>

                  <Input
                    readOnly
                    value={"Mahmut Tayfur"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Bölüm Adı</FormLabel>

                  <Input
                    readOnly
                    value={"Acil Servis"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Doktor Adı</FormLabel>

                  <Input
                    readOnly
                    value={"Dr. İbrahim Aslan"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Servis</FormLabel>

                  <Input
                    readOnly
                    value={"Acil Servis"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
              {/* not koşullu olmalı ikincil mağdur. eğer yoksa gizli olmalı */}
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>İkincil Mağdur Adı</FormLabel>

                  <Input
                    readOnly
                    value={"Ferdi Tayfur"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-4">
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Olay Yeri</FormLabel>

                  <Input
                    readOnly
                    value={"Ortopedi Polikinliği"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Olay Tarihi</FormLabel>
                  <Input
                    readOnly
                    value={"12.12.2021"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
            </div>
          </div>

          <div className="space-y-6 pl-2">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Durum</FormLabel>
                  <Input readOnly value={"Beklemede"} className="bg-gray-100" />
                </FormItem>
              </div>
              <div className="col-span-4">
                <FormItem>
                  <FormLabel>Sonlanma Tarihi</FormLabel>
                  <Input
                    readOnly
                    value={"30.12.2025"}
                    className="bg-gray-100"
                  />
                </FormItem>
              </div>
            </div>
            <div className="mt-4">
              <FormItem>
                <FormLabel>Açıklama</FormLabel>
                <Textarea
                  readOnly
                  value={
                    "Hasta acil servise geldi. Hasta acil servisten gitti."
                  }
                  className="bg-gray-100 h-28 resize-none"
                />
              </FormItem>
            </div>
            <div className="col-span-12 mt-4">
              <FormItem>
                <FormLabel>Doküman</FormLabel>
                <div className="flex items-center space-x-4 mt-2">
                  <Button
                    variant="outline"
                    className="bg-primary-900 hover:bg-primary-800 min-w-16 min-h-16 flex items-center justify-center"
                  >
                    <FolderIcon className="h-8 w-12 text-white" />
                  </Button>
                </div>
              </FormItem>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PatientFeedbackForm;
