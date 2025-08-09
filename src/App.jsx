import './style/App.scss'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NoPage'
import Work from './pages/Work'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { getPeriodOfTheYear } from './classes/utils'
import { HelmetProvider } from 'react-helmet-async';



function App() {
  
  const [currentTheme, setCurrentTheme] = useState('container')  

  useEffect(() => {
    setCurrentTheme(currentTheme + ' ' + getPeriodOfTheYear())
  }, [])

  return (
    <HelmetProvider>
      <div className={currentTheme}>
        <header> {/* Empty. For future use? */} </header>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />}  /> 
            <Route path="*" element={<NotFound />}  /> 
          </Routes>
        </Router>
        <footer className='footer'>
          aureliodurso.com © {new Date().getFullYear()}. All rights reserved.
        </footer>
      </div>
    </HelmetProvider>
  )
}

export default App
