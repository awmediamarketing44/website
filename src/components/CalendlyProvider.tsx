"use client";

import { createContext, useContext, useState, useCallback } from "react";
import CalendlyModal from "./CalendlyModal";
import ExitIntentPopup from "./ExitIntentPopup";

const CalendlyContext = createContext<{ openCalendly: () => void }>({
  openCalendly: () => {},
});

export function useCalendly() {
  return useContext(CalendlyContext);
}

export default function CalendlyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendly = useCallback(() => setIsOpen(true), []);
  const closeCalendly = useCallback(() => setIsOpen(false), []);

  return (
    <CalendlyContext.Provider value={{ openCalendly }}>
      {children}
      <CalendlyModal isOpen={isOpen} onClose={closeCalendly} />
      <ExitIntentPopup onBookCall={openCalendly} />
    </CalendlyContext.Provider>
  );
}
