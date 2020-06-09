import Link from 'next/link'
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router'

function Navigation () {
  const router = useRouter()
  console.log(router.pathname)
  const handleClick = (index, name) => {
    // console.log(index)
    // this.setState({ activeIndex: index })
    // this.props.setCategory(name.toLowerCase())
    // this.props.history.replace(`/cat/${name.toLowerCase()}`)
  }

  return (
    <div className='navigation'>
      <div className='d-flex flex-row justify-content-center mt-0 pt-0'>
        <Link href='/'>
          <span
            className={
              router.pathname === '/'
                ? 'btn btn-dark active tab'
                : 'btn btn-secondary tab'
            }
          >
            All
          </span>
        </Link>
        <Link href='/wallpapers'>
          <span
            className={
              router.pathname === '/wallpapers'
                ? 'btn btn-dark active tab'
                : 'btn btn-secondary tab'
            }
          >
            Wallpaper
          </span>
        </Link>
        <Link href='/ringtones'>
          <span
            className={
              router.pathname === '/ringtones'
                ? 'btn btn-dark active tab'
                : 'btn btn-secondary tab'
            }
          >
            Ringtone
          </span>
        </Link>
      </div>
      <hr className='divider' />
    </div>
  )
}

export default Navigation
