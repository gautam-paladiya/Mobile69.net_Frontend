import "jquery";
import "nprogress/nprogress.css";
import "../node_modules/react-circular-progressbar/dist/styles.css";
import "../styles.scss";
import "aos/dist/aos.css";

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
import Aos from "aos";

class MyApp extends App {


  componentDidMount() {
    Aos.init({
      duration: 2000,
    });
  }
  render() {
    const { Component, pageProps } = this.props;

    return <Component className=".App" {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
