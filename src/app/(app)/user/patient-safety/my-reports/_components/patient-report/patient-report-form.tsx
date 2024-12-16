"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FolderIcon } from "@heroicons/react/24/solid";
import { PatientSecuritySheetModel } from "@/models/user/patient-safety-notification/sheet-model/patient-security-sheet-model";

interface PatientFormProps {
  model: PatientSecuritySheetModel;
}

const PatientForm: React.FC<PatientFormProps> = ({ model }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6 border-r border-primary-900 pr-8">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-2">
            <label className="font-semibold">Bildirim No</label>
            <Input
              readOnly
              value={model?.reportId || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">Bildirim Tipi</label>
            <Input
              readOnly
              value={model?.reportType || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="font-semibold">Bildirimi Yapan Kişi</label>
            <Input
              readOnly
              value={model?.reporterName || ""}
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-2">
            <label className="font-semibold">Protokol No</label>
            <Input
              readOnly
              value={model?.protocolId || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">Hasta Yaşı</label>
            <Input
              readOnly
              value={model?.patientAge || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="font-semibold">Hasta Adı Soyadı</label>
            <Input
              readOnly
              value={model?.patientFullName || ""}
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-4">
            <label className="font-semibold">Bölüm Adı</label>
            <Input
              readOnly
              value={model?.doctorBranch || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="font-semibold">Doktor Adı</label>
            <Input
              readOnly
              value={model?.doctorName || ""}
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-4">
            <label className="font-semibold">Servis</label>
            <Input
              readOnly
              value={model?.service || ""}
              className="bg-gray-100"
            />
          </div>
          {model?.secondaryVictimName?.trim() && (
            <div className="col-span-4">
              <label className="font-semibold">İkincil Mağdur Adı</label>
              <Input
                readOnly
                value={model?.secondaryVictimName}
                className="bg-gray-100"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-8 gap-4 mt-4">
          <div className="col-span-4">
            <label className="font-semibold">Olay Yeri</label>
            <Input
              readOnly
              value={model?.eventLocation || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="font-semibold">Olay Tarihi</label>
            <Input
              readOnly
              value={model?.eventDate || ""}
              className="bg-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pl-8">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-4">
            <label className="font-semibold">Durum</label>
            <Input
              readOnly
              value={model?.status || ""}
              className="bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="font-semibold">Sonlanma Tarihi</label>
            <Input
              readOnly
              value={model?.completionDate || ""}
              className="bg-gray-100"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="font-semibold">Açıklama</label>
          <Textarea
            readOnly
            value={model?.description || ""}
            className="bg-gray-100 h-28 resize-none"
          />
        </div>
        <div className="col-span-12 mt-4">
          <label className="font-semibold">Döküman</label>
          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="outline"
              className="bg-primary-900 hover:bg-primary-800 min-w-16 min-h-16 flex items-center justify-center"
            >
              <FolderIcon className="h-8 w-12 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
