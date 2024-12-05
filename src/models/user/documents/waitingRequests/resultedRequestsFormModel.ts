import { z } from "zod";

export const SResultedRequestsFormModel = z.object({
  documentTypeId: z.number().int(),
  folderId: z.number().int(),
  code: z.string(),
  newFileName: z.string().optional(),
  formFile: z.instanceof(File).refine((file) => !file || file.size > 0, {
    message: "Boş bir dosya yükleyemezsiniz.",
  }),
  publishDate: z.string(),
  archiveInfo: z.string(),
  issueTypeId: z.number().int(),
  hiddenId: z.number().int(),
  format: z.string().optional(),
  reviseDate: z.string(),
  description: z.string(),
});

// descripton mutlaka girilmesi gerekiyor
export type ResultedRequestsFormModel = z.infer<
  typeof SResultedRequestsFormModel
>;

//fileId olmayan versiyonunu yao
export const SResultedRequestsReviseFormModel = z.object({
  folderId: z.number().int().optional(),
  formFile: z.instanceof(File).refine((file) => !file || file.size > 0, {
    message: "Boş bir dosya yükleyemezsiniz.",
  }),
  archiveInfo: z.string(),
  issueTypeId: z.number().int(),
  format: z.string().optional(),
  reviseDate: z.string(),
  description: z.string(),
  reviseNo: z.string(),
});

export type ResultedRequestsReviseFormModel = z.infer<
  typeof SResultedRequestsReviseFormModel
>;
