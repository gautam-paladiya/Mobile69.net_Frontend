import Link from 'next/link'

export default function (props) {
  return (
    <div id='notfound'>
      <div className='notfound'>
        <div className='notfound-404'>
          <h1>Oops!</h1>
        </div>
        <h2>{props.title || '404 - Page not found'}</h2>
        <h5>
          {props.description ||
            'The page you are looking for might have been removed had its name changed or is temporarily unavailable.'}
        </h5>
        <Link href='/' replace>
          Go To Homepage
        </Link>
      </div>
    </div>
  )
}
