import { z } from "zod";

export const SMyNotifications = z.object({
  bildiriNo: z.number().nonnegative(),
  durum: z.string(),
  bildiriTipi: z.string(),
  bildiriYapanKisi: z.string(),
  protokolNo: z.number().nonnegative(),
  olayYeri: z.string(),
  olayTarihi: z.date(),
  sonlanmaTarihi: z.date().nullable(),
});

export const exampleDataMyNotifications = {
  bildiriNo: 123,
  durum: "Open",
  bildiriTipi: "Technical",
  bildiriYapanKisi: "John Doe",
  protokolNo: 456,
  olayYeri: "Main Office",
  olayTarihi: new Date("2024-12-01"),
  sonlanmaTarihi: null,
};

export type MyNotifications = z.infer<typeof SMyNotifications>;
