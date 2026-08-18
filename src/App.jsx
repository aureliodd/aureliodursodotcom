import './style/App.scss'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NoPage'
import Work from './pages/Work'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { getPeriodOfTheYear } from './classes/utils'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import Header from './components/Header'



function AppContent() {

  const [currentTheme, setCurrentTheme] = useState('container')
  const { t } = useLanguage()

  useEffect(() => {
    setCurrentTheme((theme) => theme + ' ' + getPeriodOfTheYear())
  }, [])

  return (
    <div className={currentTheme}>
      <Helmet>
        <meta name="description" content={t('home.metaDescription')} />
      </Helmet>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />}  />
          <Route path="*" element={<NotFound />}  />
        </Routes>
      </Router>
      <footer className='footer'>
        aureliodurso.com © {new Date().getFullYear()}. {t('footer.rights')}
      </footer>
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HelmetProvider>
  )
}

export default App
