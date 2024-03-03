import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { MYNAME, SECOND, WORDDELETIONTIME, WORDWRITETIME } from '../constants/constants.js'

import me from '../assets/me.jpg'
import instagram from '../assets/instagram.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'

function Home() {

  const MYMESSAGES = JSON.parse(import.meta.env.VITE_REACT_APP_MYMESSAGES || '[]');
  const QUALITIES = JSON.parse(import.meta.env.VITE_REACT_APP_QUALITIES || '[]');
  
  const [myMessage, setMyMessage] = useState(MYMESSAGES[0].message)
  const [cursorClassName, setCursorClassName] = useState('cursor')
  const [messageIndex, setMessageIndex] = useState(0)
  const [currentQualityIndex, setCurrentQualityIndex] = useState(0)
  const [quality, setQuality] = useState(QUALITIES[0])
  const [qualityStyle, setQualitystyle] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = (messageIndex + 1);
      setMessageIndex(newIndex)
      updateMyMessage(newIndex)
    }, MYMESSAGES[messageIndex] != null ? (MYMESSAGES[messageIndex].message.length * (WORDDELETIONTIME + WORDWRITETIME) * SECOND + MYMESSAGES[messageIndex].time * SECOND) : 10 * SECOND);

    return () => {
      clearTimeout(timer);
    };

  }, [messageIndex]);


  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = (currentQualityIndex + 1) % QUALITIES.length;
      setCurrentQualityIndex(newIndex)
      updateQuality(newIndex)
    }, 5 * SECOND);
    return () => { clearTimeout(timer); };
  }, [currentQualityIndex]);


  const updateQuality = async (newIndex) => {
    setQualitystyle('qualityFadeOut')
    await new Promise(resolve => setTimeout(resolve, 0.5 * SECOND));
    setQuality(QUALITIES[newIndex])
    setQualitystyle('qualityFadeIn')
  }


  const updateMyMessage = async (newIndex) => {
    
    if(newIndex > MYMESSAGES.length ) { return }

    let currentWord = MYMESSAGES[newIndex - 1].message
    if( currentWord ) {
      while(currentWord.length > 0) {
        currentWord = currentWord.substring(0, currentWord.length - 1)
        await new Promise(resolve => setTimeout(resolve, WORDDELETIONTIME * SECOND));
        setMyMessage(currentWord)
      }
    }

    if(newIndex > MYMESSAGES.length - 1) {
      currentWord = '...'
    } else {
      currentWord = MYMESSAGES[newIndex].message
    }

    let j = 0

    while(j <= currentWord.length) {
      await new Promise(resolve => setTimeout(resolve, WORDWRITETIME * SECOND));
      setMyMessage(currentWord.substring(0, j))
      j++
    }

    if(MYMESSAGES.length - 1  < newIndex) {
      setCursorClassName('hidden')
    }
  }


  return (
    <div>
      <Helmet>
        <title>{ MYNAME } - Homepage</title>
        <meta name="description" content="Benvenuti sulla mia pagina personale" />
        <link rel="canonical" href="http://aureliodurso.com" />
      </Helmet>
      <section>
        <div /*onClick={updateMyMessage}*/ className='fadeIn'>
          <div className="bubble medium bottom">
            {myMessage} <div className={cursorClassName}></div>
          </div>
        </div>

        <div className='myPicContainer'>
          <div className='myPicOuter'>
            <img className="myPic" src={me} />
          </div>
        </div>
        <div className="myName">
          <p>{ MYNAME.toUpperCase() }</p>
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
    </div>
  )
}

export default Home
