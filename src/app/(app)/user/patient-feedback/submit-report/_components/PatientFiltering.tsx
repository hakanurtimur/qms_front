"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  PatientFeedbackFilterFormForLogin,
  SPatientFeedbackFilterFormForLogin,
} from "@/models/patientFeedbackForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ModulesUserList,
  PatientFeedbackByIdRequestModel,
} from "@/models/modules/2/PatientFeedbackModels";

interface Props {
  onSubmitFilter: (data: PatientFeedbackByIdRequestModel) => void;
  onReset: () => void;
  userList: ModulesUserList[] | undefined;
}

const PatientFiltering = ({ onSubmitFilter: onSubmit, onReset }: Props) => {
  const form = useForm<PatientFeedbackFilterFormForLogin>({
    resolver: zodResolver(SPatientFeedbackFilterFormForLogin),
    defaultValues: {
      protocolNum: "",
      patientTC: "",
    },
  });

  const handleSubmit = (data: PatientFeedbackFilterFormForLogin) => {
    console.log(data);
    const req: PatientFeedbackByIdRequestModel = {
      protocolId: data.protocolNum as string,
      identityNumber: data.patientTC as string,
    };

    onSubmit(req);
  };
  // değişkenlerin tanımlanması
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={"flex flex-col w-full h-full"}
      >
        <div className="flex flex-col h-full w-full gap-8  justify-between mb-5  ">
          <FormField
            control={form.control}
            name={"protocolNum"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Protokol No
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={"number"}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"patientTC"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  Hasta TC
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={"number"}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          {true && (
            <p className="text-danger-500 text-sm relative">
              Hasta TC veya Protokol numarasından en az biri girilmelidir.
            </p>
          )}
          <div className="w-full h-full flex  items-end justify-center gap-4">
            <Button
              onClick={() => {
                onReset();
                form.reset();
              }}
              type={"button"}
              variant={"outline"}
            >
              Sıfırla
            </Button>
            <Button type={"submit"}>Getir</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PatientFiltering;
