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
  options: { [key: string]: string } | { [key: number]: string };
  placeholder?: string;
  width?: string;
  variant?: "in-column" | "default";
  readonly?: boolean;
  searchStringCase?: "default" | "lower" | "upper";
  onChangeExtra?: (value: string) => void;
}

function Combobox<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Seçiniz",
  width = "",
  variant = "default",
  readonly = false,
  searchStringCase = "default",
  onChangeExtra,
}: FormSelectFieldProps<T>) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | undefined>();
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, open]);

  const transformSearchValue = (value: string) => {
    switch (searchStringCase) {
      case "lower":
        return value.toLowerCase();
      case "upper":
        return value.toUpperCase();
      default:
        return value;
    }
  };

  React.useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, open]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={width}>
          <FormItem className="space-y-0 pt-0 flex items-start flex-col">
            <FormLabel
              className={`${variant === "in-column" ? "mb-2.5 flex items-center py-1" : "mt-0"}`}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    ref={triggerRef}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "flex justify-between max-w-full min-w-full font-normal disabled:bg-primary-100 disabled:opacity-100 disabled:text-primary-950 truncate",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={readonly}
                  >
                    <div className="grow-0 truncate max-w-[%95]">
                      <div className="max-w-full truncate">
                        {field.value ? options[field.value] : placeholder}
                      </div>
                    </div>
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
                    <CommandInput
                      value={searchValue}
                      onValueChange={(val) =>
                        setSearchValue(transformSearchValue(val))
                      }
                      placeholder="Ara"
                    />
                    <CommandList>
                      <CommandEmpty>Bulunamadı</CommandEmpty>
                      <CommandGroup>
                        {Object.entries(options).map(([key, value]) => (
                          <CommandItem
                            value={value}
                            key={key}
                            onSelect={() => {
                              const parsedKey = isNaN(Number(key))
                                ? key
                                : Number(key);
                              field.onChange(parsedKey);
                              setOpen(false);
                              {
                                onChangeExtra && onChangeExtra(key);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                key === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
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
            <FormMessage className="pt-2" />
          </FormItem>
        </div>
      )}
    />
  );
}

export default Combobox;
