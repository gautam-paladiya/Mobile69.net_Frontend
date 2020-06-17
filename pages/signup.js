import React from 'react'
import SignupComponent from '../components/signup'
import { connect } from 'react-redux'
import Head from 'next/head'

class Signup extends React.Component {
  render () {
    return (
      <div>
        <Head>
          <title>Signup</title>
          <meta
          name='title'
          content={`${process.env.NAME_SPACE} Sign Up`}
        />
        <meta
          name='description'
          content={`By Register account to start Uploads Unlimited wallpapers, ringtones and notifications on ${process.env.NAME_SPACE}  and personalize your phone to suit you. Start your search now and free your phone`}
        />
        </Head>
        <SignupComponent />
      </div>
    )
  }
}
export default connect(state => state)(Signup)
