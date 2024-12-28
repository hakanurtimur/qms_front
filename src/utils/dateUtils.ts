// src/utils/formatDate.ts

import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = parseISO(dateString);

  if (isNaN(date.getTime())) {
    return "Geçersiz tarih";
  }

  return format(date, "dd/MM/yyyy HH:mm", { locale: tr });
};

//
export const formatDateWithoutTime = (dateString: string): string => {
  if (!dateString) return "";

  const date = parseISO(dateString);

  if (isNaN(date.getTime())) {
    return "Geçersiz tarih";
  }

  return format(date, "yyyy-MM-dd", { locale: tr });
};
