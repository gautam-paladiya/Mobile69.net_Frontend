import Head from "next/head";
import React, { Component } from "react";
import RootHead from "../components/head/RootHead";
import { IndexComponent } from "../components/index";

class Index extends Component {
  render() {
    return (
      <div>
        <Head>
          {RootHead({
            title:
              "Free ringtones, wallpapers and backgrounds for your cell phone | Mobile69",
          })}
        </Head>
        <IndexComponent />
      </div>
    );
  }
}

export default Index;
