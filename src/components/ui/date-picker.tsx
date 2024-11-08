"use client";

import * as React from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";
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
  onChange?: (value: string) => void;
  includeTime?: boolean; // Yeni prop
}

export function DatePicker({
  name,
  label,
  placeholder = "Tarih seçiniz",
  width = "",
  onChange,
  includeTime = false, // Varsayılan olarak zaman seçimi kapalı
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState<{ hours: string; minutes: string }>({
    hours: "00",
    minutes: "00",
  });

  const startDate = startOfMonth(currentMonth);
  const days = Array.from({ length: 42 }).map((_, index) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + index);
    return day;
  });

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    setOpen(false);
    if (onChange) {
      const formattedDate = format(date, "dd.MM.yyyy");
      if (includeTime) {
        const formattedDateTime = `${formattedDate} ${selectedTime.hours}:${selectedTime.minutes}`;
        onChange(formattedDateTime);
      } else {
        onChange(formattedDate);
      }
    }
  };

  const handleTimeChange = (type: "hours" | "minutes", value: string) => {
    setSelectedTime((prev) => ({ ...prev, [type]: value }));
    if (onChange && selectedDate) {
      const formattedDate = format(selectedDate, "dd.MM.yyyy");
      const formattedDateTime = `${formattedDate} ${type === "hours" ? value : selectedTime.hours}:${type === "minutes" ? value : selectedTime.minutes}`;
      onChange(formattedDateTime);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
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

  return (
    <div className={width}>
      <div className="space-y-1 flex flex-col">
        {label && (
          <label htmlFor={name} className="text-sm font-medium">
            {label}
          </label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "flex w-full justify-between font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <span className="flex-1 text-left">
                {selectedDate
                  ? includeTime
                    ? `${format(selectedDate, "dd.MM.yyyy")} ${selectedTime.hours}:${selectedTime.minutes}`
                    : format(selectedDate, "dd.MM.yyyy")
                  : placeholder}
              </span>
              {includeTime ? <ClockIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> : <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="flex justify-between items-center mb-2">
              <Button variant="ghost" size="sm" onClick={prevMonth}>
                &lt;
              </Button>
              <span className="font-semibold">
                {format(currentMonth, "MMMM yyyy", { locale: tr })}
              </span>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                &gt;
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(day)}
                  disabled={!isSameMonth(day, currentMonth)}
                  className={cn(
                    "p-1 rounded-lg hover:bg-gray-200",
                    isSameDay(day, selectedDate!) && "bg-blue-500 text-white",
                    !isSameMonth(day, currentMonth) && "text-gray-300"
                  )}
                >
                  {format(day, "d")}
                </button>
              ))}
            </div>
            {includeTime && (
              <div className="mt-4 flex space-x-4">
                <div className="flex flex-col">
                  <label htmlFor="hours" className="text-sm font-medium mb-1">
                    Saat
                  </label>
                  <Select
                  value={selectedTime.hours} 
                  onValueChange={(value) => handleTimeChange("hours", value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {generateTimeOptions(24)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="minutes" className="text-sm font-medium mb-1">
                    Dakika
                  </label>
                  <Select
                   value={selectedTime.minutes}
                  onValueChange={(value) => handleTimeChange("minutes", value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {generateTimeOptions(60)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}