import React from "react";

import Layout from "../components/Layout";
import Navigation from "../components/navigation";
import { getDataAction } from "../redux/entities/entityAction";
import WallERing from "../components/Directory";
import { wrapper } from "../redux/store";
import { connect } from "react-redux";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Link from "next/link";
import Head from "next/head";
import RootHead from "../components/head/RootHead";
import Cookie from "js-cookie";

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("index", this.props);
  }

  render() {
    return (
      <Layout>
        <div className=".homepage">
          <Head>
            {RootHead({
              title:
                "Free ringtones , HD wallpapers , backgrounds for cell phone | Mobile69",
              canonical: "ringtones-and-wallpapers",
            })}
          </Head>
          <Navigation />
          <WallERing />
        </div>
        {Cookie.get("mobile69_cookie") == "true" || (
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
