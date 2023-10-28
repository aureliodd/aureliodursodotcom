import './App.scss'
import { useEffect, useState } from 'react'

import me from './assets/me.jpg'
import instagram from './assets/instagram.png'
import linkedin from './assets/linkedin.png'
import github from './assets/github.png'

const MYMESSAGES = [
  {message: ' ', time: 300},
  {message: 'Ciao!', time: 10000},
  {message: 'Sto giocando a Super Mario Wonder', time: 10000},
  {message: 'Ti piace lo sfondo?', time: 3000},
  {message: 'È dinamico!', time: 2000},
  {message: 'Cambia in base al periodo dell\'anno.', time: 3000},
  {message: 'Anche per le festività.', time: 3000},
  {message: 'Spero ti piaccia', time: 3000},
  {message: '...anche perché...', time: 3000},
  {message: 'ho impiegato un pomeriggio intero a programmarlo', time: 4000},
]

const QUALITIES = [
  'Web & App Developer',
  'Data management & integration consultant'
]

function App() {
  
  const [messageIndex, setMessageIndex] = useState(0)
  const [myMessage, setMyMessage] = useState(MYMESSAGES[0].message)
  const [cursorClassName, setCursorClassName] = useState('cursor')
  const [currentTheme, setCurrentTheme] = useState('container')

  const [currentQualityIndex, setCurrentQualityIndex] = useState(0)
  const [quality, setQuality] = useState(QUALITIES[0])
  const [qualityStyle, setQualitystyle] = useState('')
  
  
  const currentYear = 1900 + new Date().getYear()

  useEffect(() => {
    setCurrentTheme(currentTheme + ' ' + getPeriodOfTheYear())
  }, [])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = (messageIndex + 1);
      setMessageIndex(newIndex)
      updateMyMessage(newIndex)

    }, MYMESSAGES[messageIndex] != null ? MYMESSAGES[messageIndex].time  : 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [messageIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = (currentQualityIndex + 1) % QUALITIES.length;
      setCurrentQualityIndex(newIndex)
      updateQuality(newIndex)
    }, 5000);
    return () => { clearTimeout(timer); };
  }, [currentQualityIndex]);

  const updateQuality = async (newIndex) => {
    setQualitystyle('qualityFadeOut')
    await new Promise(resolve => setTimeout(resolve, 500));
    setQuality(QUALITIES[newIndex])
    setQualitystyle('qualityFadeIn')
  }


  const updateMyMessage = async (newIndex) => {
    
    if(newIndex > MYMESSAGES.length ) { return }

    let currentWord = MYMESSAGES[newIndex - 1].message
    if( currentWord ) {
      while(currentWord.length > 0) {
        currentWord = currentWord.substring(0, currentWord.length - 1)
        await new Promise(resolve => setTimeout(resolve, 30));
        setMyMessage(currentWord)
      }
    }

    if(newIndex == MYMESSAGES.length) {
      currentWord = '...'
    } else {
      currentWord = MYMESSAGES[newIndex].message
    }

    let j = 0

    while(j <= currentWord.length) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setMyMessage(currentWord.substring(0, j))
      j++
    }


    if(MYMESSAGES.length - 1  < newIndex) {
      setCursorClassName('hidden')
    }

    // setMessageIndex(messageIndex + 1)
  }

  const getPeriodOfTheYear = () => {

    const today = new Date()
    // const today = new Date('Mar 21 2023') // Spring
    // const today = new Date('Jun 21 2023') // Summer
    // const today = new Date('Sep 21 2023') // Autumn
    // const today = new Date('Dec 21 2023') // Winter

    // const today = new Date('Dec 25 2023') // Christmas

    console.log(today)

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
      start: new Date(currentYear, 11, 24),
      end: new Date(currentYear, 11, 30)
  }];

    let classN = []

    seasons.forEach(s => {
      if (today.getTime() >= s.start.getTime() && today.getTime() < s.end.getTime()) {
        classN.push(s)
      }
    })

    let narrower

    switch (classN.length) {
      case 0:
        break
      case 1:
        narrower = classN[0]
        break
      default:
        for (const i in classN) {
          if(narrower == null) {
            narrower = classN[i]
          } else {
            if (narrower.end.getTime() - narrower.start.getTime() > classN[i].end.getTime() - classN[i].start.getTime()) {
              narrower = classN[i]
            }
          }
        }
        break
    }
    return(narrower.name)
  }

  return (
    <div className={currentTheme}>

      <header> {/* Empty. For future use? */} </header>

      <section>
  
        <div /*onClick={updateMyMessage}*/ className='fadeIn'>
          <div className="bubble medium bottom">
            {myMessage} <div className={cursorClassName}></div>
          </div>
        </div>

        <img className="myPic" src={me} />
        <div className="myName">
          <p>AURELIO D'URSO</p>
        </div>
        <p className={qualityStyle}>{quality}</p>

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
