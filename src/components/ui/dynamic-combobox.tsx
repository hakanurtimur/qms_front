"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DynamicComboboxProps {
  name: string;
  label?: string;
  options: { [key: string]: string } | { [key: number]: string };
  placeholder?: string;
  onChange?: (value: string | number) => void;
  width?: string;
  defaultValue?: string | number;
  refresh?: boolean;
}

export function DynamicCombobox({
  name,
  label,
  options,
  placeholder = "Seçiniz",
  onChange,
  defaultValue,
  width = "",
  refresh = false,
}: DynamicComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | number>(defaultValue || "");

  React.useEffect(() => {
    if (refresh) {
      setValue("");
    }
  }, [refresh]);

  React.useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const handleSelect = (selectedValue: string | number) => {
    setValue(selectedValue);
    setOpen(false);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="">
      <div className="space-y-0 pt-0 flex items-start flex-col gap-0">
        <label htmlFor={name} className="mt-0 font-semibold">
          {label}
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "flex w-full justify-between font-normal truncate",
                !value && "text-muted-foreground",
              )}
            >
              <span className="truncate">
                {value
                  ? (options as Record<string | number, string>)[value]
                  : placeholder}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={"p-0 w-" + width}>
            <Command>
              <CommandInput placeholder="Ara" />
              <CommandList>
                <CommandEmpty>Bulunamadı</CommandEmpty>
                <CommandGroup>
                  {Object.entries(options)
                    .sort((a, b) => a[1].localeCompare(b[1])) // A'dan Z'ye sıralama
                    .map(([key, value]) => (
                      <CommandItem
                        className="flex items-center"
                        value={value}
                        key={key}
                        onSelect={() =>
                          handleSelect(isNaN(Number(key)) ? key : Number(key))
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            key === value ? "opacity-100" : "opacity-0",
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
      </div>
    </div>
  );
}
