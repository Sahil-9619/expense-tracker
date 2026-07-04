import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  onWheel,
  onKeyDown,
  onChange,
  ...props
}) {
  const handleWheel = (e) => {
    if (type === "number") {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (onWheel) {
      onWheel(e);
    }
  };

  const handleKeyDown = (e) => {
    if (type === "number" && ["ArrowUp", "ArrowDown", "-", "Subtract"].includes(e.key)) {
      e.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleChange = (e) => {
    if (type === "number") {
      const sanitized = e.target.value.replace(/-/g, "");
      if (sanitized !== e.target.value) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitized,
          },
        };
        if (onChange) {
          onChange(syntheticEvent);
          return;
        }
      }
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...props} />
  );
}

export { Input }
