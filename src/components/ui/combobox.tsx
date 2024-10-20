import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { [key: string]: string };
  placeholder?: string;
}

function Combobox<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Seçiniz",
}: FormSelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0 pt-0 flex items-start flex-col gap-2">
          <FormLabel className="mt-0">{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "flex w-full justify-between font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <span className="grow-0">
                    {field.value ? options[field.value] : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Ara" />
                  <CommandList>
                    <CommandEmpty>Bulunamadı</CommandEmpty>
                    <CommandGroup>
                      {Object.entries(options).map(([key, value]) => (
                        <CommandItem
                          value={value}
                          key={key}
                          onSelect={() => {
                            field.onChange(key);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              key === field.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Combobox;
