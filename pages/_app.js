import '../styles.scss'
import 'jquery'
import Head from 'next/head'
import App from 'next/app'
import React from 'react'
import { wrapper } from '../redux/store'

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {
      // Call page-level getInitialProps
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    }

    return {
      pageProps
    }
  }
  render () {
    const { Component, pageProps } = this.props
    console.log('name', Component.displayName)
    return (
      <div>
        <Head>
          <link
            rel='icon'
            href={`${process.env.DOMAIN}/favicon.ico`}
            type='image/x-icon'
          />
        </Head>
        <Component className='.App' {...pageProps} />
      </div>
    )
  }
}

export default wrapper.withRedux(MyApp)
