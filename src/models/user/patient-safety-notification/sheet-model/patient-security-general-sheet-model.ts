import { z } from "zod";

export const SGeneralSheetSchema = z.object({
  reportId: z.string(),
  reportType: z.string(),
  reporterName: z.string(),
  eventLocation: z.string(),
  eventDate: z.string(),
  status: z.string(),
  completionDate: z.string(),
  description: z.string(),
});

export const generalSheetDummyData = {
  reportId: "G-12345",
  reportType: "İş Sağlığı ve Güvenliği",
  reporterName: "Ahmet Yılmaz",
  eventLocation: "Depo Alanı",
  eventDate: "2024-12-15",
  status: "Tamamlandı",
  completionDate: "2024-12-20",
  description:
    "Depoda iş kazası rapor edilmiştir. İlgili güvenlik önlemleri alınmıştır.",
};

export type GeneralSheetModel = z.infer<typeof SGeneralSheetSchema>;
