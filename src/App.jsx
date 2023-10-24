import './App.scss'
import { useEffect, useState } from 'react'

import me from './assets/me.jpg'
import instagram from './assets/instagram.png'
import linkedin from './assets/linkedin.png'
import github from './assets/github.png'

const MYMESSAGES = [
  'Sto giocando a Super Mario Wonder',
  'Che freddo...',
  'Ti piace lo sfondo?',
  'È dinamico!',
  'Cambia in base al periodo dell\'anno.',
  'Anche per le festività.',
  'Spero ti piaccia...',
  '...anche perché...',
  '...ho impiegato un pomeriggio a programmarlo.',
  'Monkey D. Luffy',
]

const QUALITIES = [
  'Web & App Developer',
  'Data management & integration consultant'
]

function App() {
  
  const [messageIndex, setMessageIndex] = useState(0)
  const [myMessage, setMyMessage] = useState(MYMESSAGES[messageIndex])
  const [cursorClassName, setCursorClassName] = useState('cursor')
  const [currentTheme, setCurrentTheme] = useState('container')

  
  const currentYear = 1900 + new Date().getYear()

  useEffect(() => {
    setCurrentTheme(currentTheme + ' ' + getPeriodOfTheYear())
  }, [])
  
  useEffect(() => {
    const messageUpdateInterval = setInterval(updateMyMessage, 5000);
    return () => clearInterval(messageUpdateInterval);
  }, [messageIndex]);


  const updateMyMessage = async () => {

    if(MYMESSAGES.length < messageIndex + 1) { return }

    let currentWord = myMessage

    if(myMessage.length > 0) {
      while(currentWord.length > 0) {
        currentWord = currentWord.substring(0, currentWord.length - 1)
        await new Promise(resolve => setTimeout(resolve, 30));
        setMyMessage(currentWord)
      }
    }

    if(messageIndex + 1 > MYMESSAGES.length - 1) {
      currentWord = '...'
    } else {
      currentWord = MYMESSAGES[messageIndex + 1]
    }
    let j = 0

    while(j <= currentWord.length) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setMyMessage(currentWord.substring(0, j))
      j++
    }


    if(MYMESSAGES.length - 1  < messageIndex + 1) {
      setCursorClassName('hidden')
    }

    setMessageIndex(messageIndex + 1)
  }

  const getPeriodOfTheYear = () => {

    const today = new Date()

    // today.setDate(today.getDate() + 1) // Testing delle stagioni

    const seasons = [{
      name: 'spring',
      start: new Date(currentYear, 2, 21),
      end: new Date(currentYear, 5, 20)
  },{
      name: 'summer',
      start: new Date(currentYear, 5, 21),
      end: new Date(currentYear, 8, 20)
  },{
      name: 'autumn',
      start: new Date(currentYear, 8, 21),
      end: new Date(currentYear, 11, 20)
  },{
      // non ci entrerà mai ma vbb
      name: 'winter',
      start: new Date(today.getMonth() > 3 ? currentYear : currentYear - 1, 11, 21),
      end: new Date(today.getMonth() > 3 ? currentYear + 1 : currentYear, 2, 20)
  },{
      name: 'christmas',
      exactDate: new Date(currentYear, 11, 25),
  }];

    let classN = ''

    seasons.forEach(s => {
      if (today >= s.start && today < s.end) {
        classN = s.name
      }
      if(s.exactDate != null && s.exactDate.getDate() == today.getDate() && s.exactDate.getMonth() == today.getMonth()) {
        classN = s.name
        return
      }
    })

    return(classN)
  }

  return (
    <div className={currentTheme}>

      <header> {/* Empty. For future use? */} </header>

      <section>
  
        <div onClick={updateMyMessage} className='fadeIn'>
          <div className="bubble medium bottom">
            {myMessage} <div className={cursorClassName}></div>
          </div>
        </div>

        <img className="myPic" src={me} />
        <div className="myName">
          <p>AURELIO D'URSO</p>
        </div>
        <p>{QUALITIES[0]}</p>

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

      <footer className='footer'>
        aureliodurso.com © {currentYear}. All rights reserved.
      </footer>
      
    </div>
  )
}

export default App
