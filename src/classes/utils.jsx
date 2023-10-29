import { SEASONS } from '../constants/constants.js'


export const getPeriodOfTheYear = () => {

  const today = new Date()
  // const today = new Date('Mar 21 2023') // Spring
  // const today = new Date('Jun 21 2023') // Summer
  // const today = new Date('Sep 21 2023') // Autumn
  // const today = new Date('Dec 21 2023') // Winter
  // const today = new Date('Dec 25 2023') // Christmas

  const currentYear = today.getFullYear()

  const seasons = SEASONS.map(element => {
    let fromCurrentYearToNext = element.start[1] > element.end[1]
    return {
      name: element.name,
      start: new Date(currentYear, element.start[1] - 1, element.start[0]),
      end: new Date(fromCurrentYearToNext ? currentYear + 1 : currentYear, element.end[1] - 1, element.end[0])
    };
  })

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