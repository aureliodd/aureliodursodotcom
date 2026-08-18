export const SUPPORTED_LANGUAGES = ['it', 'en']

export const DEFAULT_LANGUAGE = 'it'

const translations = {
  it: {
    nav: {
      home: 'Home',
    },
    home: {
      metaDescription: 'Benvenuti sulla mia pagina personale',
    },
    work: {
      title: 'Lavoro',
    },
    notFound: {
      title: '404',
      subtitle: 'Pagina non trovata',
      visitPrefix: 'Potresti voler visitare la',
      home: 'Home',
    },
    footer: {
      rights: 'Tutti i diritti riservati.',
    },
  },
  en: {
    nav: {
      home: 'Home',
    },
    home: {
      metaDescription: 'Welcome to my personal page',
    },
    work: {
      title: 'Work',
    },
    notFound: {
      title: '404',
      subtitle: 'Page not found',
      visitPrefix: 'You might want to visit the',
      home: 'Home',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
}

export default translations
