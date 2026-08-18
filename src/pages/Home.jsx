import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MYNAME, SECOND, WORDDELETIONTIME, WORDWRITETIME } from '../constants/constants.js'
import { useLanguage } from '../i18n/LanguageContext'

import me from '../assets/me.jpg'
import instagram from '../assets/instagram.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'

const MYMESSAGES_BY_LANG = {
  it: JSON.parse(import.meta.env.VITE_REACT_APP_MYMESSAGES_IT || '[]'),
  en: JSON.parse(import.meta.env.VITE_REACT_APP_MYMESSAGES_EN || '[]'),
}
const QUALITIES_BY_LANG = {
  it: JSON.parse(import.meta.env.VITE_REACT_APP_QUALITIES_IT || '[]'),
  en: JSON.parse(import.meta.env.VITE_REACT_APP_QUALITIES_EN || '[]'),
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Home() {

  const { language } = useLanguage()
  const MYMESSAGES = useMemo(() => MYMESSAGES_BY_LANG[language], [language])
  const QUALITIES = useMemo(() => QUALITIES_BY_LANG[language], [language])

  const [myMessage, setMyMessage] = useState(MYMESSAGES[0].message)
  const [cursorClassName, setCursorClassName] = useState('cursor')
  const [quality, setQuality] = useState(QUALITIES[0])
  const [qualityStyle, setQualitystyle] = useState('')

  useEffect(() => {
    setMyMessage(MYMESSAGES[0].message)
    setCursorClassName('cursor')

    let cancelled = false

    const typewriter = async () => {
      for (let index = 0; index < MYMESSAGES.length; index++) {
        const current = MYMESSAGES[index]

        await sleep((current.message.length * (WORDDELETIONTIME + WORDWRITETIME) + current.time) * SECOND)
        if (cancelled) return

        let currentWord = current.message
        while (currentWord.length > 0) {
          currentWord = currentWord.substring(0, currentWord.length - 1)
          await sleep(WORDDELETIONTIME * SECOND)
          if (cancelled) return
          setMyMessage(currentWord)
        }

        const nextIndex = index + 1
        const nextWord = nextIndex < MYMESSAGES.length ? MYMESSAGES[nextIndex].message : '...'

        for (let j = 0; j <= nextWord.length; j++) {
          await sleep(WORDWRITETIME * SECOND)
          if (cancelled) return
          setMyMessage(nextWord.substring(0, j))
        }

        if (nextIndex >= MYMESSAGES.length) {
          setCursorClassName('hidden')
        }
      }
    }

    typewriter()

    return () => { cancelled = true }
  }, [MYMESSAGES])


  useEffect(() => {
    setQuality(QUALITIES[0])

    let cancelled = false
    let index = 0

    const rotateQuality = async () => {
      while (!cancelled) {
        await sleep(5 * SECOND)
        if (cancelled) return

        setQualitystyle('qualityFadeOut')
        await sleep(0.5 * SECOND)
        if (cancelled) return

        index = (index + 1) % QUALITIES.length
        setQuality(QUALITIES[index])
        setQualitystyle('qualityFadeIn')
      }
    }

    rotateQuality()

    return () => { cancelled = true }
  }, [QUALITIES])


  return (
    <div>
      <Helmet>
        <title>{ MYNAME } - Homepage</title>
        <link rel="canonical" href="http://aureliodurso.com" />
      </Helmet>
      <section>
        <div className='fadeIn'>
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
