import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  PatientFeedbackForm,
  SPatientFeedbackForm,
} from "@/models/patientFeedbackForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
  onSubmitPatient: (data: PatientFeedbackForm) => void;
  patientModel: PatientFeedbackForm;
}

const PatientInformation = ({
  containerRef,
  onSubmitPatient: onSubmit,
  patientModel,
}: Props) => {
  const form = useForm<PatientFeedbackForm>({
    resolver: zodResolver(SPatientFeedbackForm),
    defaultValues: {
      name: patientModel.name,
      bornDate: patientModel.bornDate,
      patientNum: patientModel.patientNum,
      phoneNum: patientModel.phoneNum ?? "",
      description: patientModel.description ?? "",
      reportType: patientModel.reportType ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"space-y-8 animate-slide-in-from-bottom"}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-start">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  <div>Hasta Adı</div>
                </FormLabel>
                <FormControl>
                  <Input className={"bg-slate-100"} {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"bornDate"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  <div>Doğum Tarihi</div>
                </FormLabel>
                <FormControl>
                  <Input className={"bg-slate-100"} {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"patientNum"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  <div>Hasta No</div>
                </FormLabel>
                <FormControl>
                  <Input className={"bg-slate-100"} {...field} readOnly />
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
                <FormLabel className={"flex items-center justify-between"}>
                  <div>Telefon Numarası</div>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  <div>Açıklama</div>
                </FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"reportType"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"flex items-center justify-between"}>
                  <div>Bildirim Türü</div>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div></div>
          <div
            ref={containerRef}
            className="w-full flex justify-end gap-4 items-end"
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

export default PatientInformation;
