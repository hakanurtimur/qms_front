import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex read-only:bg-primary-100 min-h-[60px] w-full rounded-md border border-primary-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
