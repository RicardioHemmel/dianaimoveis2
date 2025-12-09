import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const textAreaVariants = cva(
  "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "",
        gray: "bg-gray-100",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textAreaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textAreaVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Textarea };
