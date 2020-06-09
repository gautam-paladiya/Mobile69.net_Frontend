import React from 'react'
import LoginComponent from '../components/login'
import { connect } from 'react-redux'
import Head from 'next/head'
class Login extends React.Component {
  render () {
    return (
      <div>
        <Head>
          <title>Login</title>
        </Head>
        <LoginComponent />
      </div>
    )
  }
}

export default connect(state => state)(Login)
