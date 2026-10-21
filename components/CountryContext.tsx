
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Country = {
  code: string;
  currency: string;
  symbol: string;
};

type CountryContextType = {
  country: Country;
  setCountry: (c: Country) => void;
  rates: Record<string, number> | null;
};

const CountryContext = createContext<CountryContextType | null>(null);

export function CountryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [country, setCountry] = useState<Country>({
    code: "IN",
    currency: "INR",
    symbol: "₹",
  });

  const [rates, setRates] =
    useState<Record<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRates = async () => {
      try {
        // Fetch rates through the Next.js API route
        const res = await fetch("/api/exchange-rates");

        if (!res.ok) {
          throw new Error(
            `Exchange rate request failed: ${res.status}`
          );
        }

        const data = await res.json();

        if (
          !data.rates ||
          typeof data.rates !== "object"
        ) {
          throw new Error("Invalid exchange rate response");
        }

        if (!cancelled) {
          setRates(data.rates as Record<string, number>);
        }
      } catch {
        // Keep the website working if exchange rates are unavailable.
        if (!cancelled) {
          setRates(null);
        }
      }
    };

    fetchRates();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CountryContext.Provider
      value={{ country, setCountry, rates }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error(
      "useCountry must be used inside CountryProvider"
    );
  }

  return context;
};
