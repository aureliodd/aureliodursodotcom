import { SEASONS } from '../constants/constants.js'


export const getPeriodOfTheYear = () => {

  const today = new Date()

  const currentYear = today.getFullYear()

  const seasons = SEASONS.map(element => {
    let betweenTwoYears = element.start[1] > element.end[1]

    let startYear, endYear
    startYear = endYear = currentYear

    if(betweenTwoYears) {
      let newYears = new Date(currentYear, 0, 1) // 1 gennaio dell'anno corrente
      let endDate = new Date(currentYear, element.start[1] - 1, element.start[0])

      
      if(newYears < endDate) {
        //caso siamo nell'anno nuovo
        startYear--
      } else {
        // caso siamo nell'anno vecchio
        endYear++
      }
    } 

    return {
      name: element.name,
      start: new Date(startYear, element.start[1] - 1, element.start[0]),
      end: new Date(endYear, element.end[1] - 1, element.end[0])
    };
  })

  console.log(seasons)

  let classN = []

  seasons.forEach(s => {
    if (today.getTime() >= new Date(s.start.getTime()) && today.getTime() < s.end.getTime()) {
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