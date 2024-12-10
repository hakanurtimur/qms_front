import { z } from "zod";

export const SPatientFeedbackFilterForm = z
  .object({
    interviewer: z.string().min(6, "Geçerli bir kullanıcı ismi giriniz"),
    protocolNum: z
      .string()
      .min(6, "Protokol numarası en az 7 karakter olmalıdır")
      .optional()
      .or(z.literal("")),
    patientTC: z
      .string()
      .min(11, "TC kimlik numarası en az 11 karakter olmalıdır")
      .optional()
      .or(z.literal("")),
    general: z.string().optional(),
  })
  .refine(
    (data) => {
      return !(!data.protocolNum && !data.patientTC);
    },
    {
      message: "Hasta TC veya Protokol numarasından en az biri girilmelidir.",
      path: ["general"],
    },
  );

export type PatientFeedbackFilterForm = z.infer<
  typeof SPatientFeedbackFilterForm
>;

export const SPatientFeedbackFilterFormForLogin = z.object({
  protocolNum: z
    .string()
    .min(6, "Protokol numarası en az 7 karakter olmalıdır")
    .optional()
    .or(z.literal("")),
  patientTC: z
    .string()
    .min(11, "TC kimlik numarası en az 11 karakter olmalıdır")
    .optional()
    .or(z.literal("")),
  general: z.string().optional(),
});

export type PatientFeedbackFilterFormForLogin = z.infer<
  typeof SPatientFeedbackFilterFormForLogin
>;

export const SPatientFeedbackForm = z.object({
  name: z.string(),
  bornDate: z.string(),
  patientNum: z.string(),
  phoneNum: z.string().optional(),
  reportType: z.number(),
  description: z.string().optional(),
});

export type PatientFeedbackForm = z.infer<typeof SPatientFeedbackForm>;
