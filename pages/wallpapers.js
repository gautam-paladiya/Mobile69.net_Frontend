import React from "react";

import Layout from "../components/Layout";
import { connect } from "react-redux";
import Navigation from "../components/navigation";
import { getDataAction } from "../redux/entities/entityAction";
import WallERing from "../components/Directory";
import { wrapper } from "../redux/store";
import Head from "next/head";
import RootHead from "../components/head/RootHead";

class Wallpaper extends React.Component {
  render() {
    return (
      <Layout>
        <div className=".homepage">
          <Head>
            {RootHead({
              title:
                "Free ringtones, wallpapers and backgrounds for your cell phone | Mobile69",
              canonical: "wallpapers",
            })}
          </Head>
          <Navigation />
          <WallERing />
        </div>
      </Layout>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    await store.dispatch(
      getDataAction({
        navigation: "wallpaper",
        isInitial: true,
      })
    );
  }
);

export default connect((state) => state)(Wallpaper);
