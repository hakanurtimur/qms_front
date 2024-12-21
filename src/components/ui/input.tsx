import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex read-only:bg-primary-100 h-9 w-full rounded-md border border-primary-200 bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary-950 placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:file:text-primary-50 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
