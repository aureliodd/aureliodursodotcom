import { useLanguage } from '../i18n/LanguageContext'

const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
]

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="languageSwitcher">
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          type="button"
          className={code === language ? 'active' : ''}
          onClick={() => setLanguage(code)}
          aria-label={label}
          aria-pressed={code === language}
          title={label}
        >
          {flag}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
