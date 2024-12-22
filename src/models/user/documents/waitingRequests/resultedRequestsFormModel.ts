import { z } from "zod";

// Ortak alanları içeren base model
const SampleRequestFormModel = z.object({
  folderId: z.number({ message: "Klasör seçmelisiniz." }).optional(),
  formFile: z
    .instanceof(File, {
      message: "Dosya yüklemelisiniz.",
    })
    .refine((file) => !file || file.size > 0, {
      message: "Boş bir dosya yükleyemezsiniz.",
    }),
  archiveInfo: z.string({ message: "Arşiv bilgisi boş olamaz." }).min(1, {
    message: "Arşiv bilgisi boş olamaz.",
  }),
  issueTypeId: z.number({ message: "Baskı türü seçmelisiniz." }),
  format: z.string().optional(),
  reviseDate: z.string({ message: "Revize tarihi boş olamaz." }),
  description: z.string({ message: "Açıklama boş olamaz." }).min(1, {
    message: "Açıklama boş olamaz.",
  }),
});

// İlk model (örnek: SResultedRequestsFormModel)
export const SResultedRequestsFormModel = SampleRequestFormModel.extend({
  documentTypeId: z.number({ message: "Döküman tipi seçmelisiniz." }),
  code: z.string({ message: "Kod boş olamaz." }),
  newFileName: z.string().optional(),
  publishDate: z.string({ message: "Yayın tarihi boş olamaz." }),
  hiddenId: z.number({ message: "Görünürlük boş olamaz." }),
});

export type ResultedRequestsFormModel = z.infer<
  typeof SResultedRequestsFormModel
>;

export const SResultedRequestsReviseFormModel = SampleRequestFormModel.extend({
  reviseNo: z.string({ message: "Revizyon numarası boş olamaz." }),
});

export type ResultedRequestsReviseFormModel = z.infer<
  typeof SResultedRequestsReviseFormModel
>;
