import React from "react";
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

interface FormSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  options: { [key: string]: string };
  placeholder?: string;
  width?: string;
}

function NonFormCombobox({
  value,
  onChange,
  label,
  options,
  placeholder = "",
  width = "",
}: FormSelectFieldProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={width}>
      <div className="space-y-0 pt-0 flex items-start  flex-col gap-2">
        {label && <label className="mt-0">{label}</label>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "flex w-full justify-between font-normal",
                !value && "text-muted-foreground",
              )}
            >
              <span className="grow-0">
                {value ? options[value] : placeholder}
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
                  {Object.entries(options).map(([key, name]) => (
                    <CommandItem
                      value={name}
                      key={key}
                      onSelect={(key) => {
                        setOpen(false);
                        onChange(key);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          key === value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {name}
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

export default NonFormCombobox;
