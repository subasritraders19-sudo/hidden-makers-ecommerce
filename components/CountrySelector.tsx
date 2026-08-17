"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  { code: "IN", name: "India", currency: "INR", symbol: "₹" },
  { code: "US", name: "United States", currency: "USD", symbol: "$" },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£" },
  { code: "AE", name: "UAE", currency: "AED", symbol: "د.إ" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "$" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "$" },
  { code: "SG", name: "Singapore", currency: "SGD", symbol: "$" },
  { code: "MY", name: "Malaysia", currency: "MYR", symbol: "RM" },
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥" },
  { code: "CN", name: "China", currency: "CNY", symbol: "¥" },
  { code: "KR", name: "South Korea", currency: "KRW", symbol: "₩" },
  { code: "DE", name: "Germany", currency: "EUR", symbol: "€" },
  { code: "FR", name: "France", currency: "EUR", symbol: "€" },
  { code: "IT", name: "Italy", currency: "EUR", symbol: "€" },
  { code: "ES", name: "Spain", currency: "EUR", symbol: "€" },
  { code: "NL", name: "Netherlands", currency: "EUR", symbol: "€" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", symbol: "﷼" },
  { code: "QA", name: "Qatar", currency: "QAR", symbol: "﷼" },
  { code: "KW", name: "Kuwait", currency: "KWD", symbol: "د.ك" },
  { code: "OM", name: "Oman", currency: "OMR", symbol: "﷼" },
  { code: "ZA", name: "South Africa", currency: "ZAR", symbol: "R" },
  { code: "BR", name: "Brazil", currency: "BRL", symbol: "R$" },
  { code: "RU", name: "Russia", currency: "RUB", symbol: "₽" },
  { code: "TR", name: "Turkey", currency: "TRY", symbol: "₺" },
  { code: "TH", name: "Thailand", currency: "THB", symbol: "฿" },
  { code: "ID", name: "Indonesia", currency: "IDR", symbol: "Rp" },
  { code: "PH", name: "Philippines", currency: "PHP", symbol: "₱" },
  { code: "VN", name: "Vietnam", currency: "VND", symbol: "₫" },
  { code: "NG", name: "Nigeria", currency: "NGN", symbol: "₦" },
  { code: "EG", name: "Egypt", currency: "EGP", symbol: "£" },
];

export default function CountrySelector({ onSelect }: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(countries[0]);

  const ref = useRef<HTMLDivElement>(null);

  // 🔥 LOAD SAVED COUNTRY (ON PAGE LOAD)
  useEffect(() => {
    const saved = localStorage.getItem("country");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelected(parsed);
      onSelect(parsed); // 🔥 sync with context
    }
  }, []);

  // 🔥 CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative w-60">
      
      {/* 🔥 BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary transition"
      >
        <span>
          🌍 {selected.code} - {selected.currency}
        </span>
        <ChevronDown size={16} />
      </button>

      {/* 🔥 DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-full rounded-md border border-border bg-card shadow-xl z-50 overflow-hidden backdrop-blur-md">
          
          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />

          {/* 🌍 LIST */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((c) => (
              <div
                key={c.code}
                onClick={() => {
                  setSelected(c);
                  onSelect(c);

                  // 🔥 SAVE TO LOCALSTORAGE
                  localStorage.setItem("country", JSON.stringify(c));

                  setOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition
                  hover:bg-primary hover:text-primary-foreground
                  ${
                    selected.code === c.code
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
              >
                {/* 🌍 FLAG */}
                <img
                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                  alt={c.name}
                  className="w-5 h-4 object-cover rounded-sm"
                />

                {c.code} - {c.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}