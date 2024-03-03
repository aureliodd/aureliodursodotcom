import { Link } from 'react-router-dom';
import '../style/NoPage.css'

function NotFound() {
  return (
    <div className='horizVertAlign'>
      <section className='card'>
        <h1 className='noMarginBottom'>404</h1>
        <h2 className='noMarginTop'>Not found</h2>
        Potresti voler visitare la <Link className='link' to="/">Home</Link>
    </section>
    </div>
  )
}

export default NotFound
