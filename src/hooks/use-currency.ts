"use client";

import { useCallback, useEffect, useState } from "react";

export type Currency = "USD" | "CAD";

const CURRENCY_KEY = "store-currency";
const CURRENCY_EVENT = "store-currency-changed";

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const syncCurrency = () => {
      const saved = window.localStorage.getItem(CURRENCY_KEY);
      setCurrencyState(saved === "CAD" ? "CAD" : "USD");
    };

    syncCurrency();
    window.addEventListener("storage", syncCurrency);
    window.addEventListener(CURRENCY_EVENT, syncCurrency);
    return () => {
      window.removeEventListener("storage", syncCurrency);
      window.removeEventListener(CURRENCY_EVENT, syncCurrency);
    };
  }, []);

  const setCurrency = useCallback((nextCurrency: Currency) => {
    window.localStorage.setItem(CURRENCY_KEY, nextCurrency);
    setCurrencyState(nextCurrency);
    window.dispatchEvent(new Event(CURRENCY_EVENT));
  }, []);

  return { currency, setCurrency };
}

