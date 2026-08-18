import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import translations, { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './translations'

const STORAGE_KEY = 'language'

const LanguageContext = createContext(null)

const detectBrowserLanguage = () => {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]

  const match = candidates
    .map((locale) => locale?.slice(0, 2).toLowerCase())
    .find((code) => SUPPORTED_LANGUAGES.includes(code))

  return match || DEFAULT_LANGUAGE
}

const getInitialLanguage = () => {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
  if (SUPPORTED_LANGUAGES.includes(stored)) return stored
  return detectBrowserLanguage()
}

// eslint-disable-next-line react/prop-types
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) setLanguageState(lang)
  }

  const t = useMemo(() => {
    return (key) => key.split('.').reduce((acc, part) => acc?.[part], translations[language]) ?? key
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
