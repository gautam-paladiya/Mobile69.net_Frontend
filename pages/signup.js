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
        </Head>
        <SignupComponent />
      </div>
    )
  }
}
export default connect(state => state)(Signup)
