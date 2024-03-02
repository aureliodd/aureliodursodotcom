import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

const Home = (props) => {
  const { isHome } = props
  console.log('isHome', isHome)
  return isHome && <Box>is Home: {isHome}</Box>
}

Home.propTypes = {
  isHome: PropTypes.string,
}

Home.displayName = 'Home'

export default Home
