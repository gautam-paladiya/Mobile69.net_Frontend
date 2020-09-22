import React from "react";

import Layout from "../components/Layout";
import Navigation from "../components/navigation";
import { getDataAction } from "../redux/entities/entityAction";
import WallERing from "../components/directory/wallEring";
import { wrapper } from "../redux/store";
import { connect } from "react-redux";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Link from "next/link";
import Head from "next/head";
import RootHead from "../components/head/RootHead";
import Cookie from "js-cookie";

var MobileDetect = require("mobile-detect");

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("index", props);
  }

  render() {
    return (
      <Layout canonical="all">
        <div className=".homepage">
          <Head>
            <RootHead />
          </Head>
          <Navigation />
          <WallERing />
        </div>
        {Cookie.get("mobile69_cookie") || (
          <CookieConsent
            enableDeclineButton
            location="bottom"
            buttonText="Accept"
            cookieName="mobile69_cookie"
            style={{ background: "#2B373B" }}
            buttonStyle={{
              color: "#4e503b",
              fontSize: "17px",
              borderRadios: "5px",
              fontWeight: "bold",
            }}
            expires={150}
            onAccept={() => {
              Cookie.set("mobile69_cookie", true);
            }}
          >
            Mobile69 uses cookies to improve the browsing experience and serve
            personalized ads.
            <span>
              <Link href="/privacy"> Read more</Link>
            </span>
          </CookieConsent>
        )}
      </Layout>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    // console.log('index request', req)
    var md = new MobileDetect(req.headers["user-agent"]);
    console.log(md);
    await store.dispatch(
      getDataAction({
        navigation: "all",
        isInitial: true,
      })
    );

    // return { props: store.getState() }
  }
);

export default connect((state) => state)(Home);
// export default Home
