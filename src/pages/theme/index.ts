import { extendTheme } from '@chakra-ui/react'

// Please refer to the Chakra-Ui theme customization docs found
// here https://chakra-ui.com/docs/theming/customize-theme to learn
// more about extending and overriding themes for your project.

import Prova from './components/prova'

const theme = extendTheme({
  components: {
    Prova,
  },
})

export default extendTheme(theme)
