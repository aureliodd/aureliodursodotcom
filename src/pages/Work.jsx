import { useLanguage } from '../i18n/LanguageContext'

function Work() {
  const { t } = useLanguage()
  return (
    <div>
      <h1>{t('work.title')}</h1>
    </div>
  )
}

export default Work
