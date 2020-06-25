import React from "react";

import Layout from "../components/Layout";
import Navigation from "../components/navigation";
import { getDataAction } from "../redux/entities/entityAction";
import WallERing from "../components/directory/wallEring";
import { wrapper } from "../redux/store";
import { connect } from "react-redux";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Link from "next/link";
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
          <Navigation />
          <WallERing />
        </div>
        {/* <CookieConsent
            className='position-fixed position-absolute bottom-0'
            disableStyles={true}
            location='bottom'
            buttonClasses='btn btn-primary'
            containerClasses='alert alert-warning col-lg-12'
            contentClasses='text-capitalize'
          >
            This website uses cookies to enhance the user experience.{' '}
            <span style={{ fontSize: '10px' }}>
              <Link href='/privacy'>Read more</Link>
            </span>
          </CookieConsent> */}
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
