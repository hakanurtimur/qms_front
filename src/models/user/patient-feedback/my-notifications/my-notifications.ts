import { z } from "zod";

export const SPatientFeedback = z.object({
  bildiriNo: z.number().nonnegative(),
  durum: z.string().nonempty(),
  bildiriTuru: z.string().nonempty(),
  bildiriYapanKisi: z.string().nonempty(),
  atananBolum: z.string().optional(),
  bildiriTarihi: z.string(),
  sonlanmaTarihi: z.string().nullable(),
});

export const exampleDataBildiri = {
  bildiriNo: 202,
  durum: "Tamamlandı",
  bildiriTuru: "İdari",
  bildiriYapanKisi: "Mehmet Öztürk",
  atananBolum: "Finans",
  bildiriTarihi: "2024-11-20",
  sonlanmaTarihi: "2024-12-01",
};

export type PatientFeedback = z.infer<typeof SPatientFeedback>;
