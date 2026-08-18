import { Link } from 'react-router-dom';
import '../style/NoPage.css'
import { useLanguage } from '../i18n/LanguageContext'

function NotFound() {
  const { t } = useLanguage()
  return (
    <div className='horizVertAlign'>
      <section className='card'>
        <h1 className='noMarginBottom'>{t('notFound.title')}</h1>
        <h2 className='noMarginTop'>{t('notFound.subtitle')}</h2>
        {t('notFound.visitPrefix')} <Link className='link' to="/">{t('notFound.home')}</Link>
    </section>
    </div>
  )
}

export default NotFound
