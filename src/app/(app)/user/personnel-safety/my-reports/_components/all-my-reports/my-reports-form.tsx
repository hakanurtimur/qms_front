"use client";

import React from "react";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FolderIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";

const EmployeeSafetyMyReportsForm: React.FC = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="grid grid-cols-12 gap-x-4">
        <div className="col-span-3">
          <FormItem>
            <FormLabel>Bildirim No</FormLabel>
            <FormControl>
              <Input readOnly value={"123456"} className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>

        {/* Report Type */}
        <div className="col-span-3">
          <FormItem>
            <FormLabel>Bildirim Tipi</FormLabel>
            <FormControl>
              <Input
                readOnly
                value={"İş Sağlığı ve Güvenliği"}
                className="bg-gray-100"
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-6">
          <FormItem>
            <FormLabel>Bildirimi Yapan Kişi</FormLabel>
            <FormControl>
              <Input readOnly value={"Sebahattin"} className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-6 mt-2">
          <FormItem>
            <FormLabel>Çalışan</FormLabel>
            <FormControl>
              <Input readOnly value="Sebahattin" className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-6 mt-2">
          <FormItem>
            <FormLabel>Olaydan Etkilenen</FormLabel>
            <FormControl>
              <Input readOnly value="İbrahim Aslan" className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-6 mt-2">
          <FormItem>
            <FormLabel>Olay Yeri</FormLabel>
            <FormControl>
              <Input
                readOnly
                value="Kulak Burun Boğaz Polikinliği"
                className="bg-gray-100"
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-6 mt-2">
          <FormItem>
            <FormLabel>Olay Tarihi</FormLabel>
            <FormControl>
              <Input readOnly value="03.01.2025" className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>
        <div className="col-span-6 mt-2">
          <FormItem>
            <FormLabel>Durumu</FormLabel>
            <FormControl>
              <Input readOnly value="Beklemede" className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-6 mt-2">
          <FormItem>
            <FormLabel>Sonlanma Tarihi</FormLabel>
            <FormControl>
              <Input readOnly value="04.01.2025" className="bg-gray-100" />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-12 mt-2">
          <FormItem>
            <FormLabel>Açıklama</FormLabel>
            <FormControl>
              <Textarea
                readOnly
                value="Kulak Burun Boğaz Doktoru gelmedi."
                className="bg-gray-100 h-36 resize-none"
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="col-span-12 mt-2">
          <div className="flex flex-col space-y-2">
            <FormLabel>Dokümanlar</FormLabel>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="bg-primary-900 hover:bg-primary-800 min-w-16 min-h-16"
              >
                <FolderIcon className="h-8 w-14 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeSafetyMyReportsForm;
