import { CircularProgressbar } from 'react-circular-progressbar'
import {  useState } from 'react'
export default function CountDown (props) {
  var total = 10
  const [timeleft, setTimeLeft] = useState(total)
  if (timeleft > 0) {
    setTimeout(() => {
      setTimeLeft(timeleft - 1)
    }, 1000)
  } else {
    props.toggleCountDown(false)
    props.download()
  }

  return (
    <div className='count-parent card'>
      <div className='content col-md-6 col-10'>
        <span>
          <img
            className='btn-close'
            src='/svg/close.svg'
            alt='close'
            onClick={() => {
              setTimeLeft(0)
              props.toggleCountDown(false)
            }}
            width={30}
            height={30}
          />
        </span>
        {/* <h3>To download the item</h3> */}
        <img
          width={120}
          height={120}
          src='/original.png'
          alt={`Download ${process.env.NAME_SPACE} Ringtones & Wallpapers`}
          className='original-img '
        />
        <h4>{`Download ${process.env.NAME_SPACE} Ringtones & Wallpapers`}</h4>
        <div className='mt-2'>
          <a href='https://mobile69.in/' target='_blank'>
            <img
              className='col-md-6 col-6'
              src='https://marketing.zobj.net/assets/promo_android.bd418e45e019a7693193d55ec7d930f4.png'
              alt='Google play store'
            />
          </a>
          <a href='https://mobile69.in/' target='_blank'>
            <img
              className='col-md-6 col-6'
              src='https://marketing.zobj.net/assets/promo_apple.9ab2a5dcc3cace1b3166574cf1cb3648.svg'
              alt='Apple store'
            />
          </a>
        </div>
        <h5 className='mt-2'>OR Wait for</h5>
        <div className='content-down m-3'>
          <CircularProgressbar
            className='progress'
            value={timeleft}
            maxValue={total}
            text={`${timeleft}s`}
            
          />
          <div className='title'>
            <h5></h5>
          </div>
        </div>
      </div>
    </div>
  )
}
