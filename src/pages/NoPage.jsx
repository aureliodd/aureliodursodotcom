import { Link } from 'react-router-dom';
import '../style/NoPage.css'

function NotFound() {
  return (
    <div className='horizVertAlign'>
      <section className='card'>
        <h1>404 Not found</h1>
        Potresti voler visitare la <Link to="/">home</Link>
    </section>
    </div>
  )
}

export default NotFound
