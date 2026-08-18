import { Link, useLocation } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'

function Header() {
  const { pathname } = useLocation()
  const { t } = useLanguage()
  const isHome = pathname === '/'

  return (
    <header>
      <div className="headerLeft">
        {!isHome && (
          <Link to="/" className="homeLink" aria-label={t('nav.home')} title={t('nav.home')}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5.5 10v9a1 1 0 0 0 1 1h4v-6h3v6h4a1 1 0 0 0 1-1v-9" />
            </svg>
          </Link>
        )}
      </div>
      <div className="headerRight">
        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default Header
