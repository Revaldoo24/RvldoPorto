"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "id" | "en";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  toggleLocale: () => void;
};

const STORAGE_KEY = "rvld.locale";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  return navigator.language.toLowerCase().startsWith("id") ? "id" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY);
      if (savedLocale === "id" || savedLocale === "en") {
        setLocaleState(savedLocale);
        return;
      }
    } catch (error) {
      console.error("Failed to read locale from storage:", error);
    }

    setLocaleState(getBrowserLocale());
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);

    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch (error) {
      console.error("Failed to save locale:", error);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "id" : "en");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
