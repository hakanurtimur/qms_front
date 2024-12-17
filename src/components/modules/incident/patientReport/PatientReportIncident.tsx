"use client";
import {
  IncidentFormPatient,
  SIncidentFormPatient,
} from "@/models/incidentForm";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";
import { DatePicker } from "@/components/ui/date-picker";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import {
  EventSceneListModel,
  PatientModel,
} from "@/models/modules/3/PatientSafetyFeedbackModels";
import { ModulesUserList } from "@/models/modules/2/PatientFeedbackModels";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  patientFormModel: PatientModel;
  onPatientReportSubmit: (data: IncidentFormPatient) => void;
  eventSceneTypeList: EventSceneListModel;
  userList: ModulesUserList[];
}

const PatientReportIncident = ({
  containerRef,
  patientFormModel,
  onPatientReportSubmit: onSubmit,
  eventSceneTypeList,
  userList,
}: Props) => {
  const form = useForm<IncidentFormPatient>({
    resolver: zodResolver(SIncidentFormPatient),
    defaultValues: {
      name: patientFormModel?.nameSurname || "",
      bornDate: patientFormModel?.birthDate || "",
      patientNum: String(patientFormModel?.patientId) || "",
      incidentDescription: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={
          "flex md:flex-col flex-col md:w-[900px] w-full md:h-full h-fit gap-3 transition-opacity  duration-500 ease-in-out opacity-100 md:no-scrollbar "
        }
      >
        <div className="flex flex-col w-full gap-3 ">
          <div className="flex md:flex-row flex-col w-full gap-5 ">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"w-52"}>Hasta Adı</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={patientFormModel?.nameSurname}
                      value={patientFormModel?.nameSurname}
                      readOnly
                      className="bg-slate-100 w-52"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col w-52">
              <FormField
                control={form.control}
                name={"bornDate"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"w-52"}>Doğum Tarihi</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        readonly={true}
                        value={patientFormModel?.birthDate}
                        placeholder="Tarih Seçiniz"
                        includeTime={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={"patientNum"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={""}>Hasta No</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={patientFormModel?.patientId}
                      readOnly
                      className="bg-slate-100 w-52"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full justify-start gap-5">
            <FormField
              control={form.control}
              name={"date"}
              render={({ field }) => (
                <FormItem className="w-52">
                  <FormLabel className={"w-52"}>Olay Tarihi</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      includeTime={true}
                    />
                  </FormControl>
                  <FormMessage className="absolute " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"incidentPlace"}
              render={({ field }) => (
                <FormItem className="w-52">
                  <FormLabel className={"w-52"}>Olay Yeri</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      {...field}
                      options={eventSceneTypeList.reduce(
                        (acc, item) => ({
                          ...acc,
                          [item.eventSceneId]: item.eventSceneName,
                        }),
                        {},
                      )}
                      refresh={field.value === undefined ? true : false}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      width="[230px] md:w-56"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"isSecondaryVictim"}
              render={({ field }) => (
                <FormItem className="w-52">
                  <FormLabel className={"w-full"}>İkincil Mağdur</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      {...field}
                      options={{
                        true: "Evet",
                        false: "Hayır",
                      }}
                      refresh={field.value === undefined ? true : false}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      width="[230px]"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            {form.watch("isSecondaryVictim") == "true" && (
              <FormField
                control={form.control}
                name={"secondaryVictimName"}
                render={({ field }) => (
                  <FormItem className="w-52">
                    <FormLabel className={"w-full"}>
                      İkincil Mağdur Adı
                    </FormLabel>
                    <FormControl>
                      <DynamicCombobox
                        {...field}
                        options={userList.reduce(
                          (acc, item) => ({
                            ...acc,
                            [item.userId]: item.nameSurname,
                          }),
                          {},
                        )}
                        refresh={field.value === undefined ? true : false}
                        onChange={(value) => field.onChange(value)}
                        placeholder="Seçiniz"
                        width="[230px]"
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <FormField
            control={form.control}
            name={"file"}
            render={({ field }) => (
              <FormItem className="w-full pt-2 md:px-72">
                <FormLabel className={"w-full"}>Dosya</FormLabel>
                <FormControl>
                  <Dropzone
                    className="md:w-full w-full min-h-32"
                    {...field}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <div className="w-full">
            <FormField
              control={form.control}
              name={"incidentDescription"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"w-full"}>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full md:mr-10 md:h-28 h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          ref={containerRef}
          className={"w-full flex items-end justify-end gap-4"}
        >
          <Button
            onClick={() => {
              form.reset();
            }}
            variant={"outline"}
            type={"button"}
          >
            Temizle
          </Button>
          <Button type={"submit"}>Gönder</Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientReportIncident;
