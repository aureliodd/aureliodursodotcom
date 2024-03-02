import './style/App.scss'
import { Box, useMultiStyleConfig, useTheme } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NoPage'
import Work from './pages/Work'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getPeriodOfTheYear } from './classes/utils'

function App() {
  const styles = useMultiStyleConfig('Prova')
  const theme = useTheme()
  console.log('theme', theme)
  console.log('styles', styles)
  const [currentTheme, setCurrentTheme] = useState('container')

  useEffect(() => {
    setCurrentTheme(currentTheme + ' ' + getPeriodOfTheYear())
  }, [])
  return (
    <div className={currentTheme}>
      <header> {/* Empty. For future use? */} </header>
      <Router>
        <Routes>
          <Route index element={<Home isHome={'yes'} />} />
          <Route path="work" element={<Work />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Box className="footer" {...styles.provaComponent}>
        palesi.net © {new Date().getFullYear()}. All rights reserved. Prova.
      </Box>
    </div>
  )
}

export default App
