"use client";

import { Currency } from "@/hooks/use-currency";

interface CurrencySelectProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
  disabled?: boolean;
}

export default function CurrencySelect({
  currency,
  onChange,
  disabled = false,
}: CurrencySelectProps) {
  return (
    <select
      aria-label="Select currency"
      value={currency}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as Currency)}
      className="h-10 rounded-full border border-[#E5E5E5] bg-white px-4 text-sm font-semibold outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      <option value="USD">USD</option>
      <option value="CAD">CAD</option>
    </select>
  );
}

