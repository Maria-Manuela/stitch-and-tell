/**
 * Button primitive (shadcn-style)
 * -------------------------------
 * Handles: visual variants (primary, secondary, ghost, link) and sizes with
 *          large touch targets. `asChild` lets a `Link` look like a button
 *          without nesting interactive elements.
 *
 * Does not handle: routing — pass a `Link` from `@/i18n/navigation` as child.
 */

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
        secondary:
          "bg-surface text-foreground ring-1 ring-border hover:bg-surface-2",
        ghost: "text-foreground hover:bg-surface-2",
        link: "rounded-sm text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "min-h-10 px-4 text-sm",
        md: "min-h-11 px-5 text-base",
        lg: "min-h-12 px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      data-slot="button"
      {...props}
    />
  );
}
