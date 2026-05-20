import { createContext, useContext, useState } from "react";
import { translations } from "./i18n";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("taeyang_lang") || "en");

  const t = (key) => translations[lang][key] ?? key;

  const toggle = () => {
    const next = lang === "en" ? "ko" : "en";
    setLang(next);
    localStorage.setItem("taeyang_lang", next);
  };

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
