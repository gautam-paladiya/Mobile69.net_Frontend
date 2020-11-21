import Document, { Head, Html, Main, NextScript } from "next/document";
// We wrap our scripts below in Fragment to avoid unnecessary mark up
import { Fragment } from "react";
export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   // Check if in production
  //   const isProduction = process.env.NODE_ENV === "production";
  //   const initialProps = await Document.getInitialProps(ctx);
  //   // Pass isProduction flag back through props
  //   return { ...initialProps, isProduction };
  // }

  // Function will be called below to inject
  // script contents onto page
  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-0TPD253SYC');
        `,
    };
  }

  render() {
    // console.log("cann", this.props);
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === "production" && (
            <Fragment>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-0TPD253SYC"
              ></script>
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </Fragment>
          )}
        </body>
      </Html>
    );
  }
}
