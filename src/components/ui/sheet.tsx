/**
 * Sheet / drawer (Radix Dialog)
 * -----------------------------
 * Handles: an accessible slide-over panel used by Settings. Focus is trapped
 *          while open; Escape and the overlay close it.
 *
 * Does not handle: what goes inside the panel — see SettingsSheet.
 */

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetPortal = Dialog.Portal;

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-foreground/30",
        className,
      )}
      {...props}
    />
  );
}

export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof Dialog.Content> & {
  side?: "right" | "bottom";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        className={cn(
          "fixed z-50 flex flex-col bg-surface shadow-[var(--shadow-soft)] outline-none",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full max-w-md border-l border-border",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl border-t border-border",
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </SheetPortal>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-6 pb-2", className)} {...props} />;
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("font-display text-2xl tracking-tight", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function SheetCloseButton({ label }: { label: string }) {
  return (
    <Dialog.Close
      className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2"
      aria-label={label}
    >
      <X aria-hidden="true" className="size-5" />
    </Dialog.Close>
  );
}
