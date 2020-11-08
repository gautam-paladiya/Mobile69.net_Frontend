import "jquery";
import "nprogress/nprogress.css";
import "../node_modules/react-circular-progressbar/dist/styles.css";
import "../styles.scss";

import App from "next/app";
import React from "react";
import { wrapper } from "../redux/store";
import NProgress from "nprogress";
import Router from "next/router";
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  // static getInitialProps = async ({ Component, ctx }) => {
  //   let pageProps = {
  //     // Call page-level getInitialProps
  //     ...(Component.getInitialProps
  //       ? await Component.getInitialProps(ctx)
  //       : {}),
  //   };

  //   return {
  //     pageProps,
  //   };
  // };
  render() {
    const { Component, pageProps } = this.props;

    return <Component className=".App" {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
