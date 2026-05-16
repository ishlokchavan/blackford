"use client";

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-black text-ivory border border-black hover:bg-charcoal-mid hover:border-charcoal-mid",
  secondary:
    "bg-transparent text-black border border-black hover:bg-black hover:text-ivory",
  ghost:
    "bg-transparent text-charcoal-light border border-transparent hover:border-border hover:text-black",
  gold:
    "bg-transparent text-gold border border-gold hover:bg-gold hover:text-ivory",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px] tracking-[0.12em]",
  md: "px-7 py-3.5 text-[11px] tracking-[0.14em]",
  lg: "px-9 py-4 text-[11px] tracking-[0.16em]",
};

const LuxuryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading, disabled, children, className = "", ...props },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={[
          "relative inline-flex items-center justify-center gap-2",
          "font-body font-medium uppercase",
          "transition-colors duration-300 ease-out",
          "select-none cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        aria-label={props["aria-label"]}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={loading ? "opacity-0" : ""}>{children}</span>
      </motion.button>
    );
  }
);

LuxuryButton.displayName = "LuxuryButton";
export { LuxuryButton as Button };
