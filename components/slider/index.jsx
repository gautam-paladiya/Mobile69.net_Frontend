import React, { Component, useEffect, useState } from 'react'
import Link from 'next/link'
import { getIsAuthenticated, handleLogout } from '../../utils/AuthService '
import { useRouter } from 'next/router'
import closeIcon from '../../assets/svg/close.svg'

function Slider (props) {
  const handleSignin = () => {
    getIsAuthenticated() && handleLogout()
    props.toggleSlider()
  }

  console.log('authenticate', getIsAuthenticated())
  return (
    <div className='slider' onClick={() => props.toggleSlider()}>
      <div className='content text-left col-md-3 col-sm-12 '>
        <img
          alt='close'
          src={closeIcon}
          width={50}
          height={50}
          className='text-white py-2 align-self-start '
          onClick={() => props.toggleSlider()}
        />

        <h5 className='text-muted  '>Content</h5>
        <div className='d-flex flex-column category'>
          <div className='con-item text-left text-white'>
            <h5>
              <Link href='/all'>All</Link>
            </h5>
          </div>

          <div className='con-item text-left text-white'>
            <h5>
              <Link href='/wallpapers'>Wallpaper</Link>
            </h5>
          </div>

          <div className='con-item text-left text-white'>
            <h5>
              <Link href='/ringtones'>Ringtone</Link>
            </h5>
          </div>
        </div>
        <h5 className='text-muted py-2'>Share Your Content</h5>
        <div className='d-flex flex-column justify-content-left'>
          <Link href='/uploads'>
            <button type='button' className='btn btn-primary'>
              Uploads
            </button>
          </Link>
        </div>
        <button
          type='button'
          onClick={handleSignin}
          className='btn btn-outline-danger my-4'
        >
          {getIsAuthenticated() === 'true' ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default Slider
