import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  label = "Bir tarih seçiniz",
  description,
  placeholder = "Bir tarih seçiniz",
  minDate = new Date("1900-01-01"),
  maxDate = new Date("2100-01-01"),
  disabled = false,
}: DatePickerProps<T>) => {
  return (
    <Controller<T>
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        let selectedDate: Date | undefined = undefined;
        if (field.value && typeof field.value === "string") {
          selectedDate = parse(field.value, "dd.MM.yyyy", new Date());
        }

        const handleDateSelect = (date: Date | undefined) => {
          field.onChange(date ? format(date, "dd.MM.yyyy") : "");
        };

        const displayText =
          field.value && typeof field.value === "string"
            ? field.value.includes("-")
              ? format(
                  parse(field.value, "yyyy-MM-dd", new Date()),
                  "dd.MM.yyyy",
                )
              : field.value
            : undefined;

        return (
          <FormItem className="flex flex-col">
            {label && (
              <FormLabel
                className={`my-[5px] ${fieldState.error && "text-red-500"}`}
              >
                {label}
              </FormLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "pl-3 text-left font-normal disabled:bg-primary-100 disabled:opacity-100",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={disabled}
                  >
                    {displayText ? displayText : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date > maxDate || date < minDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default FormDatePicker;
