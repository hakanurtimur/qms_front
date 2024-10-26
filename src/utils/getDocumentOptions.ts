import { DocumentModel } from "@/models/document";
import camelCase from "next/dist/build/webpack/loaders/css-loader/src/camelcase";

export const getDocumentOptions = (
  data: DocumentModel[],
): {
  categoryNames: { [key: string]: string };
  subCategoryNames: { [key: string]: string };
  folderNames: { [key: string]: string };
  fileNames: { [key: string]: string };
} => {
  const categorySet = new Set<string>();
  const subCategorySet = new Set<string>();
  const folderSet = new Set<string>();
  const fileSet = new Set<string>();

  data.forEach((item) => {
    if (item.categoryName) {
      categorySet.add(item.categoryName.toLocaleUpperCase("tr"));
    }
    if (item.subCategoryName) {
      subCategorySet.add(item.subCategoryName.toLocaleUpperCase("tr"));
    }
    if (item.folderName) {
      folderSet.add(item.folderName.toLocaleUpperCase("tr"));
    }
    if (item.fileName) {
      fileSet.add(item.fileName.toLocaleUpperCase("tr"));
    }
  });

  const toCamelCase = (str: string): string => {
    return camelCase(str.toLocaleLowerCase("tr"));
  };

  const convertSetToObject = (set: Set<string>): { [key: string]: string } => {
    const obj: { [key: string]: string } = {};
    set.forEach((item) => {
      if (item) {
        const camelKey = toCamelCase(item);
        obj[camelKey] = item;
      }
    });
    return obj;
  };

  console.log({
    categoryNames: convertSetToObject(categorySet),
    subCategoryNames: convertSetToObject(subCategorySet),
    folderNames: convertSetToObject(folderSet),
    fileNames: convertSetToObject(fileSet),
  });

  return {
    categoryNames: convertSetToObject(categorySet),
    subCategoryNames: convertSetToObject(subCategorySet),
    folderNames: convertSetToObject(folderSet),
    fileNames: convertSetToObject(fileSet),
  };
};
