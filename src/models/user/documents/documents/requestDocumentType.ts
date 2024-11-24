import { z } from "zod";
import { SResponseModel } from "@/models/api/response";

const SRequestDocumentType = z.object({
  fileId: z.number(),
  categoryName: z.string().nullable(),
  folderName: z.string().nullable(),
  documentTypeId: z.number(),
  documentTypeName: z.string(),
  fileName: z.string().nullable(),
  printing: z.number(),
  reading: z.number(),
  url: z.string().nullable(),
  changeRequest: z.number(),
  state: z.boolean(),
});

export type RequestDocumentType = z.infer<typeof SRequestDocumentType>;

const SRequestDocumentTypeResponse = SResponseModel.extend({
  data: z.array(SRequestDocumentType),
});

export type RequestDocumentTypeResponse = z.infer<
  typeof SRequestDocumentTypeResponse
>;
