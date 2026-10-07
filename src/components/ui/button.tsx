import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-bush-700 text-white shadow-sm hover:bg-bush-800 hover:shadow-md",
        accent: "bg-amber-gold-400 text-charcoal-900 shadow-sm hover:bg-amber-gold-500",
        secondary: "bg-white text-ink ring-1 ring-sand-300 hover:bg-sand-100 hover:ring-sand-300",
        ghost: "text-ink hover:bg-sand-100",
        outline: "ring-1 ring-current/30 hover:bg-white/10",
        emergency: "bg-clay-600 text-white shadow-sm hover:bg-clay-700",
        link: "text-bush-700 underline-offset-4 hover:underline px-0! h-auto!",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
