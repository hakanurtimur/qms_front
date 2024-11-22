"use client";
import { IncidentFormPatient, SIncidentForm } from "@/models/incidentForm";
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
import { incidentPlaces } from "@/constants/incidentPlaces";
import { nameSurnamePairs } from "@/constants/dummy_combobox_items";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  patientFormModel: IncidentFormPatient | null;
  onPatientReportSubmit: (data: IncidentFormPatient) => void;
}

const PatientReportIncident = ({
  containerRef,
  patientFormModel,
  onPatientReportSubmit: onSubmit,
}: Props) => {
  const form = useForm<IncidentFormPatient>({
    resolver: zodResolver(SIncidentForm),
    defaultValues: {
      name: patientFormModel?.name || "",
      bornDate: patientFormModel?.bornDate || "",
      patientNum: patientFormModel?.patientNum || "",
      date: "",
      incidentPlace: "",
      incidentDescription: "",
      file: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={
          "flex md:flex-col flex-col md:w-[900px] w-full md:h-full h-fit gap-4 transition-opacity  duration-500 ease-in-out opacity-100  "
        }
      >
        <div className="flex flex-col w-full gap-6 ">
          <div className="flex md:flex-row flex-col w-full gap-6 ">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"w-52"}>Hasta Adı</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-slate-100 w-52" />
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
                        value={patientFormModel?.bornDate}
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
                    <Input {...field} readOnly className="bg-slate-100 w-52" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"phoneNum"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={""}>Telefon No</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-slate-100 w-52" />
                  </FormControl>
                  <FormMessage className="absolute " />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full justify-start gap-6  ">
            <div className="flex flex-col gap-4 w-52 ">
              <FormField
                control={form.control}
                name={"date"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"w-52"}>(*)Olay Tarihi</FormLabel>
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
                  <FormItem>
                    <FormLabel className={"w-52"}>(*)Olay Yeri</FormLabel>
                    <FormControl>
                      <DynamicCombobox
                        {...field}
                        options={incidentPlaces}
                        onChange={(value) => field.onChange(value)}
                        placeholder="Seçiniz"
                        width="[230px]"
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex md:flex-row flex-col md:w-[600px] w-full justify-between  gap-4">
              <div className="flex flex-col md:min-w-52 w-full gap-4">
                <FormField
                  control={form.control}
                  name={"isSecondaryVictim"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"w-full"}>İkincil Mağdur</FormLabel>
                      <FormControl>
                        <DynamicCombobox
                          {...field}
                          options={{
                            true: "Evet",
                            false: "Hayır",
                          }}
                          onChange={(value) => field.onChange(value)}
                          placeholder="Seçiniz"
                          width="[230px]"
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </FormItem>
                  )}
                />
                {form.watch("isSecondaryVictim") === "true" && (
                  <FormField
                    control={form.control}
                    name={"secondaryVictimName"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={"w-full"}>
                          İkincil Mağdur Adı
                        </FormLabel>
                        <FormControl>
                          <DynamicCombobox
                            {...field}
                            options={nameSurnamePairs}
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
              <div className="flex flex-col justify-center md:ml-8 items-center w-full gap-4">
                <FormField
                  control={form.control}
                  name={"file"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"w-full"}>Dosya</FormLabel>
                      <FormControl>
                        <Dropzone
                          className="md:w-[400px] w-full  h-28 justify-center items-center"
                          {...field}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <FormField
            control={form.control}
            name={"incidentDescription"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"w-full"}>(*)Açıklama</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full md:mr-10 md:h-32 h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
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
