"use client";

import { useEffect, useId, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GeoapifyResult = {
  formatted: string;
  housenumber?: string;
  street?: string;
  address_line1?: string;
  city?: string;
  state?: string;
  state_code?: string;
  postcode?: string;
  country_code?: string;
};

type GeoapifyResponse = { results?: GeoapifyResult[] };

export type ShippingAddressValues = {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: "US" | "CA";
};

export function GeoapifyAddressAutocomplete({
  value,
  onChange,
}: {
  value: ShippingAddressValues;
  onChange: (address: ShippingAddressValues) => void;
}) {
  const listboxId = useId();
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const [suggestions, setSuggestions] = useState<GeoapifyResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = value.address.trim();
    if (!apiKey || trimmedQuery.length < 3) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          text: trimmedQuery,
          format: "json",
          filter: "countrycode:us,ca",
          limit: "5",
          apiKey,
        });
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?${params}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Could not load address suggestions");

        const data = (await response.json()) as GeoapifyResponse;
        setSuggestions(data.results || []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setSuggestions([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [apiKey, value.address]);

  const selectAddress = (result: GeoapifyResult) => {
    const country = result.country_code?.toUpperCase() === "CA" ? "CA" : "US";
    const address =
      [result.housenumber, result.street].filter(Boolean).join(" ") ||
      result.address_line1 ||
      result.formatted;

    onChange({
      address,
      city: result.city || "",
      province: result.state_code || result.state || "",
      postalCode: result.postcode || "",
      country,
    });
    setSuggestions([]);
  };

  const updateAddress = (address: string) => {
    onChange({ ...value, address });
  };

  const updateField = <Field extends keyof ShippingAddressValues>(
    field: Field,
    fieldValue: ShippingAddressValues[Field],
  ) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="space-y-4">
      <div className="relative space-y-2">
        <Label htmlFor="shipping-address">Street address</Label>
        <Input
          id="shipping-address"
          value={value.address}
          onChange={(event) => updateAddress(event.target.value)}
          placeholder="Start typing your address"
          required
          autoComplete="street-address"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={value.address.trim().length >= 3 && suggestions.length > 0}
          aria-controls={listboxId}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-9 h-4 w-4 animate-spin text-[#666666]" />
        )}
        {value.address.trim().length >= 3 && suggestions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-[#EFEFEF] bg-white py-1 shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion.formatted}-${index}`}
                role="option"
                aria-selected="false"
              >
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectAddress(suggestion)}
                  className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-[#111111] hover:bg-[#faf7f0]"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {suggestion.formatted}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="shipping-city">City</Label>
          <Input
            id="shipping-city"
            value={value.city}
            onChange={(event) => updateField("city", event.target.value)}
            required
            autoComplete="address-level2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-province">State / Province</Label>
          <Input
            id="shipping-province"
            value={value.province}
            onChange={(event) => updateField("province", event.target.value)}
            required
            autoComplete="address-level1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-postal-code">Postal code</Label>
          <Input
            id="shipping-postal-code"
            value={value.postalCode}
            onChange={(event) => updateField("postalCode", event.target.value)}
            required
            autoComplete="postal-code"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-country">Country</Label>
          <select
            id="shipping-country"
            value={value.country}
            onChange={(event) =>
              updateField("country", event.target.value as "US" | "CA")
            }
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
      </div>

      {!apiKey && (
        <p className="text-sm text-red-600">
          Add NEXT_PUBLIC_GEOAPIFY_API_KEY to enable address autocomplete.
        </p>
      )}
    </div>
  );
}
