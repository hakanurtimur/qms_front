"use client";

import * as React from "react";
import { CalendarIcon, Check, ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from "date-fns";
import { tr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  width?: string;
  value?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
  includeTime?: boolean; // Yeni prop
}

export function DatePicker({
  name,
  label,
  placeholder = "Tarih seçiniz",
  width = "",
  onChange,
  readonly,
  value,
  includeTime = false, // Varsayılan olarak zaman seçimi kapalı
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(
    new Date(),
  );

  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDateTime(date);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (onChange) {
      onChange(format(selectedDateTime, "yyyy-MM-dd'T'HH:mm"));
    }
  }, [selectedDateTime, onChange]);

  const handleYearChange = (value: string) => {
    const year = parseInt(value, 10);
    const newDate = new Date(selectedDateTime);
    newDate.setFullYear(year);
    setSelectedDateTime(newDate);
  };

  const handleMonthChange = (increment: number) => {
    const newDate = addMonths(selectedDateTime, increment);
    setSelectedDateTime(newDate);
  };

  const handleDateSelect = (date: Date) => {
    if (!readonly) {
      const newDate = new Date(selectedDateTime);
      newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedDateTime(newDate);
    }
  };

  const handleTimeChange = (type: "hours" | "minutes", value: string) => {
    const newDate = new Date(selectedDateTime);
    if (type === "hours") {
      newDate.setHours(parseInt(value, 10));
    } else {
      newDate.setMinutes(parseInt(value, 10));
    }
    setSelectedDateTime(newDate);
  };

  const generateTimeOptions = (max: number) => {
    return Array.from({ length: max }).map((_, index) => {
      const value = index < 10 ? `0${index}` : `${index}`;
      return (
        <SelectItem key={value} value={value}>
          {value}
        </SelectItem>
      );
    });
  };

  const startDate = startOfMonth(selectedDateTime);
  const days = Array.from({ length: 42 }).map((_, index) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + index);
    return day;
  });

  return (
    <div className={width}>
      <div className="space-y-1 flex flex-col">
        {label && (
          <label htmlFor={name} className="text-sm font-medium">
            {label || "Tarih"}
          </label>
        )}
        <Popover
          open={open}
          onOpenChange={(value) => {
            if (readonly) {
              return;
            }
            setOpen(value);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "flex w-full justify-between font-normal",
                !selectedDateTime && "text-muted-foreground",
                readonly && "bg-primary-100",
              )}
            >
              <span className="flex-1 text-left">
                {selectedDateTime
                  ? includeTime
                    ? `${format(selectedDateTime, "dd.MM.yyyy")} ${selectedDateTime.getHours().toString().padStart(2, "0")}:${selectedDateTime.getMinutes().toString().padStart(2, "0")}`
                    : format(selectedDateTime, "dd.MM.yyyy")
                  : placeholder}
              </span>
              {includeTime ? (
                <ClockIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              ) : (
                <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 ">
            <div className="flex justify-between items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMonthChange(-1)}
              >
                &lt;
              </Button>
              <span className="font-semibold flex justify-center items-center">
                {format(selectedDateTime, "MMMM", { locale: tr })}{" "}
                <Select
                  value={selectedDateTime.getFullYear().toString()}
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-20 border-none shadow-none">
                    <SelectValue
                      placeholder={new Date().getFullYear().toString()}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMonthChange(1)}
              >
                &gt;
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  disabled={!isSameMonth(day, selectedDateTime)}
                  className={cn(
                    "p-1 rounded-lg hover:bg-gray-200",
                    isSameDay(day, selectedDateTime) &&
                      "bg-blue-500 text-white",
                    !isSameMonth(day, selectedDateTime) && "text-gray-300",
                  )}
                >
                  {format(day, "d")}
                </button>
              ))}
            </div>

            <div className="mt-4 flex space-x-4 ">
              {includeTime && (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="hours" className="text-sm font-medium mb-1">
                      Saat
                    </label>
                    <Select
                      value={selectedDateTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}
                      onValueChange={(value) =>
                        handleTimeChange("hours", value)
                      }
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="00" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>{generateTimeOptions(24)}</SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="minutes"
                      className="text-sm font-medium mb-1"
                    >
                      Dakika
                    </label>
                    <Select
                      value={selectedDateTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                      onValueChange={(value) =>
                        handleTimeChange("minutes", value)
                      }
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="00" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>{generateTimeOptions(60)}</SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div className="flex flex-row justify-center items-end">
                <Check
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 p-1 items-center justify-center text-primary-800 cursor-pointer hover:text-primary-900 transition-colors duration-200 ease-in-out transform hover:bg-slate-100 border rounded"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
