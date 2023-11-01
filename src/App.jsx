import './style/App.scss'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NoPage'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { getPeriodOfTheYear } from './classes/utils'


function App() {
  
  const [currentTheme, setCurrentTheme] = useState('container')  

  useEffect(() => {
    setCurrentTheme(currentTheme + ' ' + getPeriodOfTheYear())
  }, [])

  return (
    <div className={currentTheme}>
      <header> {/* Empty. For future use? */} </header>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />}  /> 
        </Routes>
      </Router>
      <footer className='footer'>
        aureliodurso.com © {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  )
}

export default App
