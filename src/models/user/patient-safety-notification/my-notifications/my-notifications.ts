import { z } from "zod";

export const SMyNotifications = z.object({
  bildiriNo: z.number().nonnegative(),
  durum: z.string(),
  bildiriTipi: z.string(),
  bildiriYapanKisi: z.string(),
  protokolNo: z.number().nonnegative(),
  olayYeri: z.string(),
  olayTarihi: z.string(),
  sonlanmaTarihi: z.string(),
});

export const exampleDataMyNotifications = {
  bildiriNo: 123,
  durum: "Open",
  bildiriTipi: "Technical",
  bildiriYapanKisi: "John Doe",
  protokolNo: 456,
  olayYeri: "Main Office",
  olayTarihi: new Date().toDateString(),
  sonlanmaTarihi: new Date().toDateString(),
};

export type MyNotifications = z.infer<typeof SMyNotifications>;
