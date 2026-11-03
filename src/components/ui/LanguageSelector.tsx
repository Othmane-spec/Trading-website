"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, type Language } from "@/context/LanguageContext";

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦" },
];

export function LanguageSelector({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { language, setLanguage, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-card/80 hover:bg-brand-elevated border border-brand-border hover:border-brand-gold/40 text-xs font-medium text-white transition-all duration-200 cursor-pointer shadow-sm group focus:outline-none focus:ring-1 focus:ring-brand-gold"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-semibold tracking-wide text-brand-goldLight uppercase">
          {currentLang.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-brand-slateText group-hover:text-brand-gold transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-48 rounded-xl bg-brand-dark/95 border border-brand-border/80 shadow-2xl backdrop-blur-xl p-1.5 z-50 ${
              isRtl ? "left-0" : "right-0"
            }`}
          >
            <div className="px-2 py-1.5 border-b border-brand-border/40 text-[10px] uppercase font-mono tracking-wider text-brand-slateText/70 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-brand-gold" />
                <span>Language</span>
              </span>
              <span className="text-brand-gold font-bold">3 Options</span>
            </div>

            <div className="py-1 space-y-0.5">
              {LANGUAGES.map((item) => {
                const isSelected = item.code === language;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition cursor-pointer text-left ${
                      isSelected
                        ? "bg-brand-gold/15 text-white font-semibold border border-brand-gold/30"
                        : "text-brand-slateText hover:text-white hover:bg-brand-card/70"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{item.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-white leading-tight font-medium">
                          {item.nativeLabel}
                        </span>
                        <span className="text-[10px] text-brand-slateText/70 leading-tight">
                          {item.label}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-gold" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
