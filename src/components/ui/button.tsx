import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[2px] border border-transparent text-sm font-semibold whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-background hover:bg-accent/90 border-accent font-bold",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 border-primary font-bold",
        outline:
          "border-border bg-transparent text-foreground hover:bg-surface-raised hover:border-border/80 hover:text-foreground",
        secondary:
          "bg-surface-raised text-foreground border-border hover:bg-surface hover:border-foreground/30",
        ghost:
          "text-foreground/90 hover:bg-surface-raised hover:text-foreground",
        destructive:
          "bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/30",
        link:
          "text-accent underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-10 gap-2 px-4 py-2 text-sm",
        xs: "h-7 gap-1 px-2.5 text-xs",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-12 gap-2.5 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
