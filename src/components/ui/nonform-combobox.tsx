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
import { Label } from "@/components/ui/label";

interface FormSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  options: { [key: string]: string };
  placeholder?: string;
  width?: string;
  variant?: "in-column" | "default";
  readonly?: boolean;
}

function NonFormCombobox({
  value,
  onChange,
  label,
  options,
  placeholder = "Seçiniz",
  width = "",
  variant = "default",
  readonly = false,
}: FormSelectFieldProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, open]);

  return (
    <div className={width}>
      <div className="space-y-0 pt-0 flex items-start  flex-col gap-2">
        {label && (
          <Label
            className={`${variant === "in-column" ? "mb-2.5 flex items-center py-1" : "mt-0"}`}
          >
            {label}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              role="combobox"
              className={cn(
                "flex w-full justify-between font-normal",
                !value && "text-muted-foreground",
              )}
              disabled={readonly}
            >
              <span className="grow-0">
                {value ? options[value] : placeholder}
              </span>
              {!readonly && (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0"
            style={{
              width: popoverWidth || "auto",
            }}
          >
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
