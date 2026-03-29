"use client";

import MagneticButton from "./MagneticButton";
import { useCalendly } from "./CalendlyProvider";

interface BookCallButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function BookCallButton({
  children = "Book a FREE Call",
  variant = "primary",
  className = "",
}: BookCallButtonProps) {
  const { openCalendly } = useCalendly();

  return (
    <MagneticButton
      href="#"
      variant={variant}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openCalendly();
      }}
    >
      {children}
    </MagneticButton>
  );
}
