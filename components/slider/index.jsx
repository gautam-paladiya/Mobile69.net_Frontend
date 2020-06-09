import React, { Component, useEffect, useState } from 'react'
import Link from 'next/link'
import { getIsAuthenticated, handleLogout } from '../../utils/AuthService '
import { useRouter } from 'next/router'

function Slider (props) {
  const handleSignin = () => {
    getIsAuthenticated() && handleLogout()
    props.toggleSlider()
  }

  console.log('authenticate', getIsAuthenticated())
  return (
    <div className='slider'>
      <div className='content text-left col-md-3 col-sm-12 '>
        <img
          src='/svg/close.svg'
          width={50}
          height={50}
          className='text-white py-2 align-self-start '
          onClick={() => props.toggleSlider()}
        />

        <h5 className='text-muted  '>Content</h5>
        <div className='d-flex flex-column category'>
          <div className='con-item text-left text-white'>
            <Link href='/ringtones-and-wallpapers'>All</Link>
          </div>

          <div className='con-item text-left text-white'>
            <Link href='/wallpapers'>Wallpaper</Link>
          </div>

          <div className='con-item text-left text-white'>
            <Link href='/ringtones'>Ringtone</Link>
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
