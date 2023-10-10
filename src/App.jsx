import './App.scss'
import { useEffect, useState } from 'react'

import me from './assets/me.jpg'
import instagram from './assets/instagram.png'
import linkedin from './assets/linkedin.png'
import github from './assets/github.png'

const QUALITIES = [
  'Web Developer',
  'App Developer'
]

function App() {

  // const [scrollPosition, setScrollPosition] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [myMessage, setMyMessage] = useState('');

  const currentYear = 1900 + new Date().getYear() 

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // function handleScroll() {
  //   setScrollPosition(window.pageYOffset)
  // }

  return (
    <div className="container">

      <header> {/* Empty. For future use? */} </header>
      

      <section>
  
        <div>
          <div className="bubble medium bottom">
            {myMessage}
          </div>
        </div>

        <img className="myPic" src={me} />
        <div className="myName">
          <p>AURELIO DURSO</p>
        </div>
        <p>{QUALITIES[qualityIndex]}</p>

        <div className="social">
          <a href="http://github.com/aureliodd" rel='noreferrer' target='_blank'>
            <img src={github} />
          </a>
          <a href="https://www.linkedin.com/in/aurelio-d-urso-92a680161/" rel='noreferrer' target='_blank'>
            <img src={linkedin} /> 
          </a>
          <a href="http://instagram.com/aureliodd" rel='noreferrer' target='_blank'>
            <img src={instagram} /> 
          </a>
        </div>
      </section>

      <footer>
        aureliodurso.com © {currentYear}. All rights reserved.
      </footer>
      
    </div>
  )
}

export default App
