import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "px-2 py-1 rounded-2xl text-xs font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-foreground/15 text-foreground border border-foreground",
        danger: "bg-danger/15 text-danger border border-danger",
        warning: "bg-warning/15 text-warning border border-warning",
        success: "bg-success/15 text-success border border-success",
        info: "bg-info/15 text-info border border-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Chip({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="chip"
      data-variant={variant}
      className={cn(chipVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Chip, chipVariants };

export type ChipVariantProps =
  VariantProps<typeof chipVariants>;