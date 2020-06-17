import '../styles.scss'
import 'jquery'
import Head from 'next/head'
import App from 'next/app'
import React from 'react'
import { wrapper } from '../redux/store'
import NProgress from 'nprogress'
import Router from 'next/router'
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
          <link rel='stylesheet' type='text/css' href='/nprogress.css' />

          <link
            rel='icon'
            href={`${process.env.DOMAIN}/favicon.ico`}
            type='image/x-icon'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, user-scalable=yes'
          ></meta>
          <meta
            name='google-site-verification'
            content='sDO0yPIrhn6NLlOnkqXJBV28J1I0-S-BO9YE1xhbjoE'
          />
          <meta data-rh='true' property='og:type' content='website' />
        </Head>
        <Component className='.App' {...pageProps} />
      </div>
    )
  }
}

export default wrapper.withRedux(MyApp)
