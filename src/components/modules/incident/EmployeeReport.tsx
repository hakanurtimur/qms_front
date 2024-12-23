"use client";
import {
  IncidentFormEmployee,
  SIncidentFormEmployee,
} from "@/models/incidentForm";
import { Controller, useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropZone";
import { DynamicCombobox } from "@/components/ui/dynamic-combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { ModulesUserList } from "@/models/modules/2/PatientFeedbackModels";
import { EventSceneListModel } from "@/models/modules/3/PatientSafetyFeedbackModels";

interface Props {
  onSubmit: (data: IncidentFormEmployee) => void;
  userList: ModulesUserList[];
  eventSceneTypeList: EventSceneListModel;
}

const EmployeeReport = ({ onSubmit, userList, eventSceneTypeList }: Props) => {
  const form = useForm<IncidentFormEmployee>({
    resolver: zodResolver(SIncidentFormEmployee),
    defaultValues: {
      incidentDescription: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1 w-full h-full "
      >
        <div
          className="w-full flex md:flex-row flex-col md:gap-12
         gap-6 "
        >
          <div className="w-full flex flex-col md:flex-col gap-2 items-center ">
            <FormField
              control={form.control}
              name="employeeName"
              render={({ field }) => (
                <FormItem className="w-56">
                  <FormLabel>Çalışan</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      options={
                        userList?.reduce(
                          (acc, item) => {
                            acc[item.userId] = item.nameSurname;
                            return acc;
                          },
                          {} as { [key: string]: string },
                        ) || {}
                      }
                      name="employeeName"
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      width="[240px]"
                      refresh={field.value === undefined ? true : false}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-56 pt-3">
                  <FormLabel>Olay Tarihi</FormLabel>
                  <FormControl>
                    <DatePicker
                      name="date"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      includeTime={true}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
          <div className="md:w-56 w-full flex flex-col md:flex-col gap-2 items-center justify-center">
            <FormField
              control={form.control}
              name="affectedPerson"
              render={({ field }) => (
                <FormItem className="w-56 ">
                  <FormLabel>Olaydan Etkilenen</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      refresh={field.value === undefined ? true : false}
                      options={
                        userList?.reduce(
                          (acc, item) => {
                            acc[item.userId] = item.nameSurname;
                            return acc;
                          },
                          {} as { [key: string]: string },
                        ) || {}
                      }
                      name="affectedPerson"
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      width="[240px]"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incidentPlace"
              render={({ field }) => (
                <FormItem className="w-56 pt-3">
                  <FormLabel>Olay Yeri</FormLabel>
                  <FormControl>
                    <DynamicCombobox
                      refresh={field.value === undefined ? true : false}
                      options={eventSceneTypeList.reduce(
                        (acc, item) => ({
                          ...acc,
                          [item.eventSceneId]: item.eventSceneName,
                        }),
                        {},
                      )}
                      name="incidentPlace"
                      onChange={(value) => field.onChange(value)}
                      placeholder="Seçiniz"
                      width="[250px]"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-full  flex flex-col md:flex-col gap-2 ">
            <Controller
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="md:w-[300px] w-full md:min-h-[110px] justify-center items-center   ">
                  <FormLabel>Dosya Yükle</FormLabel>
                  <FormControl>
                    <Dropzone
                      onChange={(file) => field.onChange(file)}
                      className="w-full justify-center items-center  h-full"
                      fileExtensions={["pdf", "png", "jpg", "jpeg"]}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-col gap-2 pt-3 ">
          <FormField
            control={form.control}
            name="incidentDescription"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Açıklama</FormLabel>
                <FormControl>
                  <Textarea className="w-full min-h-32" {...field} />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center justify-end gap-4 pt-4">
          <Button
            onClick={() => {
              form.reset();
            }}
            variant="outline"
            type="button"
          >
            Temizle
          </Button>
          <Button type="submit">Gönder</Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeReport;
