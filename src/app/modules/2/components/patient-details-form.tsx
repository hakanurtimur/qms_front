import React from "react";
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
import { Input } from "@/components/ui/input";
import { PatientFeedbackForm } from "@/models/patientFeedbackForm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  PatientDetailsSchema,
  TPatientDetails,
} from "../models/patient-details-model";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";

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
        className={
          "space-y-8  animate-slide-in-from-bottom flex md:flex-row flex-col w-full"
        }
      >
        <div className="flex flex-col w-full gap-8 items-start ">
          <div className="flex md:flex-row flex-col  gap-10 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div>Adı Soyadı</div>
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
          <div className="flex md:flex-grow  flex-col gap-10 md:w-56 w-full">
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <DynamicCombobox
                  name="reportType"
                  options={reportTypes}
                  label="Bildirim Türü"
                  onChange={field.onChange}
                  width="-56 md:w-full"
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
                    <Textarea className="md:w-[723px] " rows={8} {...field} />
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
