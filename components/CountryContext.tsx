"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

export function CountryProvider({ children }: { children: React.ReactNode }) {
  
  const [country, setCountry] = useState<Country>({
    code: "IN",
    currency: "INR",
    symbol: "₹",
  });

  const [rates, setRates] = useState<Record<string, number> | null>(null);

  // 🔥 FETCH LIVE RATES
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/INR"
        );
        const data = await res.json();

        setRates(data.rates);
      } catch (error) {
        console.error("Rate fetch failed:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry, rates }}>
      {children}
    </CountryContext.Provider>
  );
}

// 🔥 CUSTOM HOOK (SAFE)
export const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountry must be used inside CountryProvider");
  }

  return context;
};