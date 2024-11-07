import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatientFeedbackForm } from "@/models/patientFeedbackForm";
import { Textarea } from "@/components/ui/textarea";
import Combobox from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { TPatientDetails, PatientDetailsSchema } from "../models/patient-details-model";
interface PatientDetailsFormProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  patientModel: PatientFeedbackForm;
}

const reportTypes = {
  tesekkur: "Teşekkür",
  sikayet: "Şikayet",
  oneri: "Öneri",
  talep: "Talep",
};



const PatientDetailsForm = ({
  containerRef,
  onSubmitPatient,
  patientModel,
}: PatientDetailsFormProps) => {
  const form = useForm<TPatientDetails>({
    resolver: zodResolver(PatientDetailsSchema),
    defaultValues: {
      name: patientModel.name,
      bornDate: patientModel.bornDate,
      patientNum: patientModel.patientNum,
      phoneNum: patientModel.phoneNum ?? "",
      reportType: patientModel.reportType ?? "",
      description: patientModel.description ?? "",
    },
  });

  const onSubmit = (data: TPatientDetails) => {
    onSubmitPatient(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-8  animate-slide-in-from-bottom flex w-full" }
      >
        <div className="flex flex-col w-full gap-8 items-start ">
          <div className="flex flex-row gap-10 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Ad</div>
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-slate-100 pe-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bornDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Doğum Tarihi</div>
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-slate-100 pe-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Hasta No</div>
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-slate-100 pe-11" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Telefon No</div>
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-slate-100 pe-11" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-grow gap-10 w-full">
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <Combobox
                  width="w-[217px]"
                  control={form.control}
                  {...field}
                  label="Rapor Türü"
                  options={reportTypes}
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Açıklama</div>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="w-[723px]" rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div
            ref={containerRef}
            className="w-full flex justify-end gap-4  items-end pe-10 pb-6"
          >
            <Button
              onClick={() => {
                form.reset();
              }}
              variant="outline"
              type={"button"}
            >
              Temizle
            </Button>
            <Button type={"submit"}>Kaydet</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PatientDetailsForm;
