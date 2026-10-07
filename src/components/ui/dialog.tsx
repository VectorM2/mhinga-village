"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

function Overlay() {
  return <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />;
}

export function DialogContent({ className, children, hideClose, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { hideClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <Overlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 shadow-lift data-[state=open]:animate-fade-up sm:p-8",
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-muted transition hover:bg-sand-100 hover:text-ink" aria-label="Close">
            <X className="size-5" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/** Side drawer built on the same primitive (used for mobile navigation). */
export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <Overlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-sand-50 shadow-lift transition-transform data-[state=open]:animate-[sheet-in_0.3s_cubic-bezier(0.2,0.7,0.2,1)]",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
