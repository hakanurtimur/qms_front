import { z } from "zod";

export const SRequestDocumentCreate = z
  .object({
    RoleId: z.number().int(),
    UserId: z.number().int(),
    DepartmentId: z.number().int({ message: "Departman seçilmelidir." }),
    DocumentTypeId: z
      .number({ message: "Doküman tipi seçilmelidir." })
      .int({ message: "Doküman tipi seçilmelidir." }),
    Description: z
      .string()
      .min(5, { message: "Açıklama en az 5 karakter olmalıdır." }),
    GarbageFileName: z.string(),
    FileId: z.number().int().optional().nullable(),
    FormFile: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file.size > 0, {
        message: "Boş bir dosya yükleyemezsiniz.",
      }),
    TemporaryFileName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.FileId == null || data.FileId < 0) {
      console.log("FileId", data.FileId);
      if (!data.FormFile && !data.TemporaryFileName) {
        ctx.addIssue({
          code: "custom",
          path: ["TemporaryFileName"],
          message: "Temsili dosya adı dosya yüklenmediğinde zorunludur.",
        });
      } else if (data.TemporaryFileName && data.TemporaryFileName.length < 3) {
        ctx.addIssue({
          code: "custom",
          path: ["TemporaryFileName"],
          message: "Temsili dosya adı en az 3 karakter olmalıdır.",
        });
      }
    }
  });

export type RequestDocumentCreate = z.infer<typeof SRequestDocumentCreate>;

export const SRequestDocumentCreateBody = z.object({
  "form-data": SRequestDocumentCreate,
});

export type RequestDocumentCreateBody = z.infer<
  typeof SRequestDocumentCreateBody
>;

const SRequestDocumentCreatedModel = z.object({
  id: z.number(),
  documentTypeId: z.number(),
  documentTypeName: z.string().nullable(),
  userId: z.number(),
  roleId: z.number(),
  userName: z.string().nullable(),
  mail: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  departmentId: z.number(),
  departmentName: z.string().nullable(),
  adminId: z.number(),
  adminName: z.string().nullable(),
  superAdminId: z.number(),
  superAdminName: z.string().nullable(),
  administratorId: z.number(),
  administratorName: z.string().nullable(),
  actionId: z.number(),
  actionName: z.string().nullable(),
  superAdminActionId: z.number(),
  superAdminActionName: z.string().nullable(),
  administratorActionId: z.number(),
  administratorActionName: z.union([z.string(), z.number()]).nullable(),
  superAdminAboutId: z.number(),
  superAdminAboutName: z.string().nullable(),
  requestTypeId: z.number(),
  requestTypeName: z.string().nullable(),
  archiveInfo: z.string().nullable(),
  description: z.string().nullable(),
  descriptionUser: z.string().nullable(),
  descriptionAdmin: z.string().nullable(),
  descriptionSuperAdmin: z.string().nullable(),
  fileUploadState: z.boolean(),
  updateDate: z.string(), // Alternatively, you could validate as a date if needed.
  openDate: z.string(),
  garbageId: z.number(),
  garbageFileName: z.string().nullable(),
  garbageUrl: z.string().nullable(),
  authRequestId: z.number(),
  pathName: z.string(),
  guid: z.string(),
  guidUrl: z.string().nullable(),
  code: z.string().nullable(),
  hiddenId: z.number(),
  hiddenName: z.string().nullable(),
  fileId: z.number(),
  folderId: z.number(),
  issueTypeId: z.number(),
  issueTypeName: z.string().nullable(),
  publishDate: z.string(),
  reviseDate: z.string(),
  getValue: z.number(),
});

export type RequestDocumentCreatedModel = z.infer<
  typeof SRequestDocumentCreatedModel
>;

const SRequestDocumentCreatedModelResponse =
  SRequestDocumentCreatedModel.extend({
    data: SRequestDocumentCreatedModel,
  });

export type RequestDocumentCreatedModelResponse = z.infer<
  typeof SRequestDocumentCreatedModelResponse
>;
