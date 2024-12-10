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
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import {
  PatientDetailsSchema,
  TPatientDetails,
} from "@/app/modules/2/models/patient-details-model";
import {
  FeedbackTypeModel,
  PatientFeedbackByIdModel,
} from "@/models/modules/2/PatientFeedbackModels";

interface PatientDetailsFormProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  patientModel: PatientFeedbackByIdModel;
  feedbackTypes: FeedbackTypeModel[] | undefined;
}

const PatientDetailsForm = ({
  containerRef,
  onSubmitPatient,
  patientModel,
  feedbackTypes,
}: PatientDetailsFormProps) => {
  const form = useForm<TPatientDetails>({
    resolver: zodResolver(PatientDetailsSchema),
    defaultValues: {
      name: patientModel?.nameSurname,
      bornDate: patientModel?.birthDate,
      patientNum: String(patientModel.patientId),
      phoneNum: patientModel.phoneNumber ?? "",
    },
  });

  const onSubmithandle = (data: PatientFeedbackForm) => {
    onSubmitPatient(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmithandle)}
        className={
          "space-y-8  animate-slide-in-from-bottom flex md:flex-row flex-col w-full"
        }
      >
        <div className="flex flex-col w-full gap-8 items-start ">
          <div className="flex md:flex-row flex-col  gap-11 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-52">
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
                <FormItem className="w-52">
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
                <FormItem className="w-52">
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
                <FormItem className="w-52">
                  <FormLabel className="flex items-center justify-between">
                    <div>Telefon No</div>
                  </FormLabel>
                  <FormControl>
                    <Input className=" pe-11" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-grow  flex-col gap-10 md:w-52 w-full">
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <DynamicCombobox
                    name="reportType"
                    options={
                      feedbackTypes?.reduce(
                        (acc, item) => {
                          acc[item.feedbackTypeId] = String(
                            item.feedbackTypeName,
                          );
                          return acc;
                        },
                        {} as { [key: number]: string },
                      ) || {}
                    }
                    label="Bildirim Türü"
                    onChange={field.onChange}
                    width="-56 md:w-full"
                  />
                  <FormMessage />
                </FormItem>
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
                    <Textarea className="md:w-[973px] " rows={5} {...field} />
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
