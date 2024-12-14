import { z } from "zod";

export const SEmployeeSafetyNotifications = z.object({
  bildiriNo: z.number().nonnegative(),
  durum: z.string().nonempty(),
  bildiriYapanKisi: z.string().nonempty(),
  calisanAdi: z.string().optional(),
  olaydanEtkilenen: z.string().optional(),
  olayYeri: z.string().nonempty(),
  olayTarihi: z.string(),
  sonlanmaTarihi: z.string().nullable(),
});

// Örnek veri
export const EmployeeExampleData = {
  bildiriNo: 456,
  durum: "Devam Ediyor",
  bildiriYapanKisi: "Ayşe Kaya",
  calisanAdi: "Ali Veli",
  olaydanEtkilenen: "Merve Demir",
  olayYeri: "Fabrika A",
  olayTarihi: "2024-12-10",
  sonlanmaTarihi: null,
};

// Tür tanımı
export type EmployeeSafetyNotifications = z.infer<
  typeof SEmployeeSafetyNotifications
>;
